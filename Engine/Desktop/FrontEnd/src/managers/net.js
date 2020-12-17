import { EventEmitter } from 'events'
import { Worker } from 'worker_threads'
import { BrowserWindow, ipcMain, ipcRenderer } from 'electron'
export default class NetManager extends EventEmitter {
  constructor(target) {
    super()
    this.target = target
    switch (this.target) {
      case 'main':
        this.core = new ToMain()
        break
      case 'renderer':
        this.core = new ToRenderer()
        break
      case 'back':
        this.core = new ToBack()
        break
      default:
        break
    }
    this.recv = (data) => { this.emit('recv', data) }
    this.core.on('recv', this.recv)
  }

  start(ip = '', port = 0) { this.core.start(ip, port) }
  send(data) { this.core.send(data) }
}
class ToMain extends EventEmitter {
  constructor() {
    super()
    ipcRenderer.on('data', (e, data) => { this.recv(data) })
  }

  start(ip, port) { }
  send(data) { ipcRenderer.send('data', data) }
  recv(data) { this.emit('recv', data) }
}
class ToRenderer extends EventEmitter {
  constructor() {
    super()
    ipcMain.on('data', (e, data) => { this.recv(data) })
  }

  start(ip, port) { }
  send(data) { BrowserWindow.getAllWindows()[0].webContents.send('data', data) }
  recv(data) { this.emit('recv', data) }
}
class ToBack extends EventEmitter {
  start(ip, port) {
    this.worker = new Worker('./src/workers/net.js')
    this.worker.on('message', (pkg) => {
      if (pkg.type === 'connection') {
        this.recv(pkg)
      } else if (pkg.type === 'recv') {
        this.recv(pkg.data)
      }
    })
    this.worker.postMessage({
      type: 'listen',
      data: {
        address: ip,
        port: port
      }
    })
  }

  send(data) { this.worker.postMessage({ type: 'send', data: data }) }
  recv(data) { this.emit('recv', data) }
}
