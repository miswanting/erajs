import { EventEmitter } from 'events'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppIndex from '../components/AppIndex.vue'
import AppIdle from '../components/AppIdle.vue'
import AppConsole from '../components/AppConsole.vue'
import AppMap from '../components/AppMap.vue'
export class RouterManager extends EventEmitter {
  constructor () {
    super()
    window.router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/', component: AppIndex },
        { path: '/idle', component: AppIdle },
        { path: '/console', component: AppConsole },
        { path: '/map', component: AppMap }
      ]
    })
  }

  getVueRouter () { return window.router }
}
