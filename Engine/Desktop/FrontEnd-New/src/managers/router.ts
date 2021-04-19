import { EventEmitter } from 'events'
import { createRouter, createWebHashHistory, createWebHistory, Router } from 'vue-router'
export default class RouterManager extends EventEmitter {
  router: Router
  constructor() {
    super()
    this.router = createRouter({
      history: createWebHistory(),
      routes: []
    })
  }
  getVueRouter() { }
}
