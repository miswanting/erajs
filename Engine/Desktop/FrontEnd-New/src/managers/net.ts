import { EventEmitter } from 'events'
import { Worker } from 'worker_threads'
import { BrowserWindow, ipcMain, ipcRenderer } from 'electron'
enum TargetType {
  Main,
  Renderer,
  Back
}
interface NetNode {
  start(host: string, port: number)
  send(data: Object)
  recv(data: Object)
}
export default class NetManager extends EventEmitter implements NetNode {
  targetType: TargetType
  core: NetNode
  constructor(target: TargetType) {
    super()
    this.targetType = target
    switch (target) {
      case TargetType.Main:
        this.core = new ToMain()
        break;
      case TargetType.Renderer:
        this.core = new ToRenderer()
        break;
      case TargetType.Back:
        this.core = new ToBack()
        break;
      default:
        break;
    }
  }
  start(host: string = 'localhost', port: number = 11994) {
    this.core.start(host, port)
  }
  send(data: Object) { this.core.send(data) }
  recv = (data: Object) => { this.emit('recv', data) }
}
class ToMain extends EventEmitter implements NetNode {
  start() {
    ipcRenderer.on('data', (_, data) => { this.recv(data) })
  }
  send(data: Object) { ipcRenderer.send('data', data) }
  recv(data: Object) { }
}
class ToRenderer extends EventEmitter implements NetNode {
  start() {
    ipcMain.on('data', (_, data) => { this.recv(data) })
  }
  send(data: Object) { BrowserWindow.getAllWindows()[0].webContents.send('data', data) }
  recv(data: Object) { }
}
class ToBack extends EventEmitter implements NetNode {
  worker: Worker
  start(host: string = 'localhost', port: number = 11994) {
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
        address: host,
        port: port
      }
    })
  }
  send(data: Object) { this.worker.postMessage({ type: 'send', data: data }) }
  recv(data: Object) { }
}