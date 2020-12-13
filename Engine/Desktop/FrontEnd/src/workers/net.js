const { parentPort } = require('worker_threads')
const { createServer } = require('net')
class NetWorker {
  constructor() {
    this.debug = false
    this.bufSize = 1024
    this.server = null
    this.conn = null
    this.state = {
      length: 0,
      lengthString: '',
      contentArray: []
    }
  }

  start(ip = '', port = 0) {
    this.server = createServer((conn) => {
      this.conn = conn
      parentPort.postMessage({ type: 'connection' })
      this.conn.on('data', this.handleRecvOnce)
      this.conn.on('error', (e) => {
        if (e.code === 'ECONNRESET') { console.log('后端断开连接！') }
      })
    })
    this.server.listen(port, ip)
  }

  send(data) {
    if (this.conn && !this.conn.destroyed) {
      const msg = JSON.stringify(data)
      this.debug ? console.log(`Send: ${msg}`) : null
      const content = new TextEncoder().encode(msg)
      this.conn.write(new TextEncoder().encode(content.length.toString() + ':' + msg))
    }
  }

  recv(msg) {
    this.debug ? console.log(`Recv: ${msg}`) : null
    parentPort.postMessage({ type: 'recv', data: JSON.parse(msg) })
  }

  handleRecvOnce = (buf) => {
    if (this.state.length === 0) {
      for (let i = 0; i < buf.length; i++) {
        const c = new TextDecoder().decode(buf.slice(i, i + 1))
        if (c === ':') {
          this.state.length = parseInt(this.state.lengthString)
          this.state.lengthString = ''
          this.handleRecvOnce(buf.slice(i + 1, buf.length))
          return
        } else {
          this.state.lengthString += c
        }
      }
    } else if (this.state.contentArray.length + buf.length < this.state.length) {
      this.state.contentArray.push(...Array.from(buf))
    } else {
      const index = this.state.length - this.state.contentArray.length
      this.state.contentArray.push(...Array.from(buf.slice(0, index)))
      const s = new TextDecoder().decode(new Uint8Array(this.state.contentArray))
      this.recv(s)
      this.state.length = 0
      this.state.contentArray = []
      this.handleRecvOnce(buf.slice(index, buf.length))
    }
  }
}
let net = null
parentPort.on('message', (pkg) => {
  if (pkg.type === 'listen') {
    net = new NetWorker()
    net.start(pkg.data.address, pkg.data.port)
  } else if (pkg.type === 'send') {
    net.send(pkg.data)
  }
})
