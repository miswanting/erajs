const { createServer } = require('net')
const { EventEmitter } = require('events')
class NetManager extends EventEmitter {
  #debug = true
  #address = ['127.0.0.1', 12021]
  #bufSize = 3
  #conn = null
  #state = {
    length: 0,
    lengthString: '',
    contentArray: new Array()
  }
  start() {
    const server = createServer((conn) => {
      conn.on('data', this.handleRecvOnce)
    })
    server.listen(this.#address[1], this.#address[0])
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
  send(data) {
    if (this.#conn) {
      this.send(JSON.stringify({ type: pkgType, data: pkgData }))
      this.#debug ? console.log(`Send: ${msg}`) : null
      const content = new TextEncoder().encode(msg)
      Deno.writeAll(this.#conn, new TextEncoder().encode(content.length.toString() + ':' + msg))
    }
  }
  recv(msg: string) {
    this.#debug ? console.log(`Recv: ${msg}`) : null
    this.recvPkg(JSON.parse(msg))
    const e = new CustomEvent('recvPkg', { 'detail': pkg })
    this.dispatchEvent(e)
  }
}
let net = new NetManager()
net.start()