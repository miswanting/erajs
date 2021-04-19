import AppManager from './managers/app'
import WindowManager from './managers/window'
export class MainManager {
  app: AppManager
  win: WindowManager
  constructor() {
    this.app = new AppManager()
    this.win = new WindowManager()
    this.app.once('ready', () => { this.start() })
  }
  start() {
    this.win.start()
  }
}
const main = new MainManager()