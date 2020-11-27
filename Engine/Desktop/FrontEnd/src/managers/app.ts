import { EventEmitter } from 'events'
import { app } from 'electron'
export class AppManager extends EventEmitter {
  constructor() {
    super()
    app.whenReady().then(() => { this.emit('ready') })
  }
}
