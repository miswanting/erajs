import { AppManager } from './managers/app'
import { WindowManager } from './managers/window'
import NetManager from './managers/net'
import { ScriptManager } from './managers/script'
export class MainManager {
  constructor () {
    this.app = new AppManager()
    this.win = new WindowManager({
      width: 800,
      height: 600,
      show: false,
      frame: false,
      transparent: true,
      useContentSize: true,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      }
    })
    this.toRenderer = new NetManager('renderer')
    this.toBack = new NetManager('back')
    this.script = new ScriptManager('Launcher.exe', 1000)
    this.app.once('ready', () => { this.start() })
    this.app.once('window-all-closed', () => { process.exit() })
    this.onRendererRecv = (data) => { this.toBack.send(data) }
    this.toRenderer.on('recv', this.onRendererRecv)
    this.onBackRecv = (data) => { this.toRenderer.send(data) }
    this.toBack.on('recv', this.onBackRecv)
  }

  start () {
    this.win.start()
    this.toRenderer.start()
    this.toBack.start('localhost', 11994)
    this.script.start()
  }
}
const main = new MainManager()
