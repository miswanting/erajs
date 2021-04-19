import { EventEmitter } from 'events'
import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import _ from 'lodash'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
export default class WindowManager extends EventEmitter {
  config: Object
  win: BrowserWindow
  constructor(config: Object = null) {
    super()
    this.config = {
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
    }
    Object.assign(this.config, config)
  }
  start() {
    this.createMainWindow()
    if (isDev) {
      this.prepareDevelopEnviroment()
    }
  }
  createMainWindow() {
    this.win = new BrowserWindow(this.config)
    this.win.once('ready-to-show', () => {
      this.win.show()
    })
    this.win.loadFile('dist/index.html')
    this.win.webContents.session.clearCache()
  }
  prepareDevelopEnviroment() {
    // installExtension(VUEJS_DEVTOOLS)
    //   .then((name) => console.log(`Extension Added!: ${name}`))
    //   .catch((err) => {
    //     console.log('An Error Occurred: ', err)
    //     console.log('But PLEASE DO NOT WORRY!')
    //     console.log('It`s FINE! It`s NOT IMPORTANT at all!')
    //   })
    this.win.webContents.openDevTools()
  }
}
