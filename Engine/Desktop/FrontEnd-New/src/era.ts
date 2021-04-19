import DisplayManager from './managers/display'
import StoreManager from './managers/store'

export class Erajs {
  dis: DisplayManager
  store: StoreManager
  constructor() {
    this.dis = new DisplayManager()
    this.store = new StoreManager({})
  }

  start() {
    this.dis.start(this.store.getVueStore())
  }
}

const erajs = new Erajs()
erajs.start()
