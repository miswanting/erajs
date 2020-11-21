const { EventEmitter } = require('events')
const { Worker } = require('worker_threads');
const { BrowserWindow, ipcRenderer, ipcMain } = require('electron')
module.exports = class NetManager extends EventEmitter {
  constructor(type) {
    super()
    this.type = type  // back, main, renderer
    if (this.type == 'main') { this.core = new ToMain() }
    else if (this.type == 'renderer') { this.core = new ToRenderer() }
    else if (this.type == 'back') { this.core = new ToBack() }
    this.core.on('recv', this.recv)
  }
  start() { this.core.start() }
  send = (data) => { this.core.send(data) }
  recv = (data) => { this.emit('recv', data) }
}
/**
 * # ToMain
 * Renderer -> Main
 */
class ToMain extends EventEmitter {
  constructor() {
    super()
    ipcRenderer.on('data', (e, data) => { this.recv(data) })
  }
  start = () => { }
  send = (data) => { ipcRenderer.send('data', JSON.stringify(data)) }
  recv = (data) => { this.emit('recv', data) }
}
/**
 * # ToRenderer
 * Main -> Renderer
 */
class ToRenderer extends EventEmitter {
  constructor() {
    super()
    ipcMain.on('data', (e, data) => { this.recv(data) })
  }
  start = () => { }
  send = (data) => { BrowserWindow.getAllWindows()[0].webContents.send('data', data) }
  recv = (data) => { this.emit('recv', data) }
}
/**
 * # ToBack
 * Main -> Back
 */
class ToBack extends EventEmitter {
  debug = false
  ready = false
  address = ['127.0.0.1', 12020]
  bufSize = 3
  conn = null
  state = {
    length: 0,
    lengthString: '',
    contentArray: new Array()
  }
  start() {
    this.worker = new Worker('./src/workers/net.js');
    this.worker.onchange = function (e) {
      const pkg = e.data
      if (pkg.type === 'ready') {
        this.ready = true
      }
    }
    this.worker.postMessage({ type: 'init' })

    /////////////////////
    // const server = createServer((conn) => {
    //   this.conn = conn
    //   conn.on('data', this.handleRecvOnce)
    //   conn.on('error', (e) => {
    //     if (e.code === 'ECONNRESET') { console.log('后端断开连接！') }
    //   })
    // })
    // server.listen(this.address[1], this.address[0])
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
      let index = this.state.length - this.state.contentArray.length
      this.state.contentArray.push(...Array.from(buf.slice(0, index)))
      const s = new TextDecoder().decode(new Uint8Array(this.state.contentArray))
      this.recv(s)
      this.state.length = 0
      this.state.contentArray = new Array()
      this.handleRecvOnce(buf.slice(index, buf.length))
      return
    }
  }
  send(data) {
    if (this.conn && !this.conn.destroyed) {
      const msg = JSON.stringify(data)
      this.debug ? console.log(`Send: ${msg}`) : null
      const content = new TextEncoder().encode(msg)
      console.log(this.conn);
      this.conn.write(new TextEncoder().encode(content.length.toString() + ':' + msg))
    }
  }
  recv(msg) {
    this.debug ? console.log(`Recv: ${msg}`) : null
    this.emit('recv', JSON.parse(msg))
  }
}