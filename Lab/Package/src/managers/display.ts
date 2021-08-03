import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../style/era.styl'
import '../style/span-charm.styl'
import { createApp } from 'vue'
import AppRouter from '../components/AppRoot.vue'
import RouterManager from './router'
export default class NetManager {
  start () {
    window.app = createApp(AppRouter)
    this.router = new RouterManager()
    window.app.use(this.router.getRouter())
    window.app.use(window.store.getStore())
    window.app.mount('body')
  }
}
