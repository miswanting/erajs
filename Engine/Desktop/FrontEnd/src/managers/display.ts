import { EventEmitter } from 'events'
import { createApp } from 'vue'
export class DisplayManager extends EventEmitter {
  app: any
  constructor () {
    super()
    document.addEventListener('mouseup', (e) => { })
    document.addEventListener('keyup', (e) => { })
  }

  start () {
    this.app = createApp({})
  }
}
