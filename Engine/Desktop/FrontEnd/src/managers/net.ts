import { EventEmitter } from 'events'
import Worker from 'worker-loader!../workers/net.worker'
import { BrowserWindow, ipcMain, ipcRenderer } from 'electron'
export class NetManager extends EventEmitter {
  target: 'main' | 'renderer' | 'back'
  core: ToMain | ToRenderer | ToBack
  constructor (target: 'main' | 'renderer' | 'back') {
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
    this.core.on('recv', this.recv)
  }

  start () { this.core.start() }
  send () { }
  recv () { }
}
class ToMain extends EventEmitter {
  constructor () {
    super()
    ipcRenderer.on('data', (e, data) => { this.recv(data) })
  }

  start () { }
  send (data: object) { ipcRenderer.send('data', data) }
  recv (data: object) { this.emit('recv', data) }
}
class ToRenderer extends EventEmitter {
  constructor () {
    super()
    ipcMain.on('data', (e, data) => { this.recv(data) })
  }

  start () { }
  send (data: object) { BrowserWindow.getAllWindows()[0].webContents.send('data', data) }
  recv (data: object) { this.emit('recv', data) }
}
class ToBack extends EventEmitter {
  worker: Worker
  constructor () {
    super()
  }

  start () {
    this.worker = new Worker()
  }

  send () { }
  recv () { }
}
