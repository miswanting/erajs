import { EventEmitter } from 'events'
import { createStore } from 'vuex'
import net from './parser'
export default class StoreManager extends EventEmitter {
  constructor () {
    super()
    const tree = {
      store: {}
    }
    // const net = {
    //   store: () => {
    //     playerID: ''
    //   },
    //   mutations: {},
    //   actions: {
    //     parse({ commit }, pkg) {
    //       console.log(`Parse: ${JSON.stringify(pkg)}`);
    //     },
    //     send({ commit }, pkg) { window.net.send(pkg) }
    //   },
    // }
    this.store = createStore({
      modules: {
        tree,
        net
      }
    })
    window.net.addListener('recv', (pkg) => {
      this.store.dispatch('parse', pkg)
    })
  }

  getStore () { return this.store }
}
