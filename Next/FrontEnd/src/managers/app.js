const { EventEmitter } = require('events')
const { app } = require('electron')
module.exports = class AppManager extends EventEmitter {
  constructor() {
    super()
    app.whenReady().then(() => { this.emit('ready') })
    app.on('window-all-closed', (e) => { console.log(e) })
    app.on('before-quit', (e) => { console.log(e) })
    app.on('will-quit', (e) => { console.log(e) })
    app.on('quit', (e, exitCode) => { console.log(e, exitCode) })
  }
}