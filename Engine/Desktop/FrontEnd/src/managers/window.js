const { EventEmitter } = require('events')
const { BrowserWindow, session } = require('electron')
const isDev = require('electron-is-dev')
module.exports = class WindowManager extends EventEmitter {
  start() {
    this.createMainWindow()
    if (isDev) {
      this.prepareDevelopEnviroment()
    }
  }

  createMainWindow() {
    this.win = new BrowserWindow({
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
    this.win.once('ready-to-show', () => {
      this.win.show()
    })
    this.win.loadFile('src/index.html')
    this.win.webContents.session.clearCache();
  }

  prepareDevelopEnviroment() {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Extension Added!: ${name}`))
      .catch((err) => {
        console.log('An Error Occurred: ', err)
        console.log('But PLEASE DO NOT WORRY!')
        console.log('It`s FINE! It`s NOT IMPORTANT at all!')
      });
    this.win.webContents.openDevTools()
  }
}