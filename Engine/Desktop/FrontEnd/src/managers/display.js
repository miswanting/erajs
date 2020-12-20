import { EventEmitter } from 'events'
import { createApp } from 'vue'
import { RouterManager } from './router'
import AppRouter from '../components/AppRoot.vue'
import 'normalize.css'
import '../style/era.styl'
export class DisplayManager extends EventEmitter {
  start (store) {
    window.app = createApp(AppRouter)
    this.router = new RouterManager()
    window.app.use(this.router.getVueRouter())
    window.app.use(store)
    window.app.mount('body')
  }
}
