class NetManager extends EventTarget {
  #debug = true
  #address: any = ['127.0.0.1', 12020]
  #bufSize = 3
  #conn: Deno.Conn | null = null
  #state = {
    length: 0,
    lengthString: '',
    contentArray: new Array()
  }
  async bind() {
    const listener = Deno.listen({ hostname: this.#address[0], port: this.#address[1] })
    for await (const conn of listener) {
      this.#conn = conn
      this.handleConnection(conn)
    }
  }
  async handleConnection(conn: Deno.Conn) {
    for await (const buf of Deno.iter(conn, { bufSize: this.#bufSize })) {
      this.handleRecvOnce(buf)
    }
  }
  handleRecvOnce(buf: Uint8Array) {
    if (this.#state.length === 0) {
      for (let i = 0; i < buf.length; i++) {
        const c = new TextDecoder().decode(buf.slice(i, i + 1))
        if (c === ':') {
          this.#state.length = parseInt(this.#state.lengthString)
          this.#state.lengthString = ''
          this.handleRecvOnce(buf.slice(i + 1, buf.length))
          return
        } else {
          this.#state.lengthString += c
        }
      }
    } else if (this.#state.contentArray.length + this.#bufSize < this.#state.length) {
      this.#state.contentArray.push(...Array.from(buf))
    } else {
      let index = this.#state.length - this.#state.contentArray.length
      this.#state.contentArray.push(...Array.from(buf.slice(0, index)))
      const s = new TextDecoder().decode(new Uint8Array(this.#state.contentArray))
      this.recv(s)
      this.#state.length = 0
      this.#state.contentArray = new Array()
      this.handleRecvOnce(buf.slice(index, buf.length))
      return
    }
  }
  send(msg: string) {
    if (this.#conn) {
      this.#debug ? console.log(`Send: ${msg}`) : null
      const content = new TextEncoder().encode(msg)
      Deno.writeAll(this.#conn, new TextEncoder().encode(content.length.toString() + ':' + msg))
    }
  }
  sendPkg(pkgType: string, pkgData: Object) {
    this.send(JSON.stringify({ type: pkgType, data: pkgData }))
  }
  recv(msg: string) {
    this.#debug ? console.log(`Recv: ${msg}`) : null
    const e = new CustomEvent('recv', { 'detail': msg })
    this.dispatchEvent(e)
    this.recvPkg(JSON.parse(msg))
  }
  recvPkg(pkg: Object) {
    const e = new CustomEvent('recvPkg', { 'detail': pkg })
    this.dispatchEvent(e)
  }
}
const net = new NetManager()
net.addEventListener('recvPkg', function (e: any) {
  net.sendPkg(e.detail.type, e.detail.data)
})
net.bind()