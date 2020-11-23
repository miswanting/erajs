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
class ToMain extends EventEmitter {
  constructor() {
    super()
    ipcRenderer.on('data', (e, data) => { this.recv(data) })
  }
  start = () => { }
  send = (data) => { ipcRenderer.send('data', data) }
  recv = (data) => { this.emit('recv', data) }
}
class ToRenderer extends EventEmitter {
  constructor() {
    super()
    ipcMain.on('data', (e, data) => { this.recv(data) })
  }
  start = () => { }
  send = (data) => { BrowserWindow.getAllWindows()[0].webContents.send('data', data) }
  recv = (data) => { this.emit('recv', data) }
}
class ToBack extends EventEmitter {
  ready = false
  start() {
    this.worker = new Worker('./src/workers/net.js')
    this.worker.on('message', (pkg) => {
      if (pkg.type === 'ready') {
        this.ready = true
      } else if (pkg.type === 'recv') {
        this.recv(pkg.data)
      }
    })
    this.worker.postMessage({ type: 'init' })
    this.worker.postMessage({ type: 'start' })
  }
  send = (data) => { this.worker.postMessage({ type: 'send', data: data }) }
  recv = (data) => { this.emit('recv', data) }
}