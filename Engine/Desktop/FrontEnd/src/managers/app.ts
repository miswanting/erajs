import { EventEmitter } from 'events'
import { app } from 'electron'
export class AppManager extends EventEmitter {
  constructor () {
    super()
    app.on('will-finish-launching', () => { this.emit('will-finish-launching') })
    app.on('ready', () => { this.emit('ready') })
    app.on('window-all-closed', () => { this.emit('window-all-closed') })
    app.on('before-quit', () => { this.emit('before-quit') })
    app.on('will-quit', () => { this.emit('will-quit') })
    app.on('quit', () => { this.emit('quit') })
  }
}
