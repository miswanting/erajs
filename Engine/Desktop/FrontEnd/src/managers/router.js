import { EventEmitter } from 'events'
import { createRouter, createWebHashHistory } from 'vue-router'
// import AppIdle from '../components/AppIdle'
import AppIdle from '../components/AppIdle.vue'
export class RouterManager extends EventEmitter {
  constructor () {
    super()
    this.router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/', component: null },
        { path: '/idle', component: AppIdle }
      ]
    })
  }

  getVueRouter () { return this.router }
}
