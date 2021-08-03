import { createRouter, createWebHashHistory } from 'vue-router'
import AppIndex from '../routes/AppIndex.vue'
import AppIdle from '../routes/AppIdle.vue'
import AppLogin from '../routes/AppLogin.vue'
export default class RouterManager {
  constructor () {
    window.router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/', component: AppIndex },
        { path: '/idle', component: AppIdle },
        { path: '/login', component: AppLogin }
      ]
    })
  }

  getRouter () { return window.router }
}
