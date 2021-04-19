import { EventEmitter } from 'events'
import { createApp } from 'vue'
import AppRouter from '../components/AppRoot.vue'
import RouterManager from './router'
export default class DisplayManager extends EventEmitter {
  router: RouterManager
  start(store) {
    window['app'] = createApp(AppRouter)
    this.router = new RouterManager()
    window['app'].use(this.router.getVueRouter())
    window['app'].use(store)
    window['app'].mount('body')
  }
}