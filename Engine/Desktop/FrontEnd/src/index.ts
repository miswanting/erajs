import { AppManager } from './managers/app'
import { WindowManager } from './managers/window'
import { NetManager } from './managers/net'
import { ScriptManager } from './managers/script'
export class MainManager {
  app: AppManager
  win: WindowManager
  toBack: NetManager
  toRenderer: NetManager
  script: AppManager
  constructor() {
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
    this.app.once('ready', () => { this.start() })
    this.toBack = new NetManager('back')
    this.toRenderer = new NetManager('renderer')
    this.script = new ScriptManager('Launcher.exe', 1000)
    this.toBack.on('recv', this.onBackRecv)
    this.toRenderer.on('recv', this.onRendererRecv)
  }

  start() {
    this.win.start()
    this.toBack.start()
    // this.toRenderer.start()
    // this.script.start()
  }

  onRendererRecv() {
    throw new Error('Method not implemented.')
  }

  onBackRecv() {
    throw new Error('Method not implemented.')
  }
}
const _ = new MainManager()
