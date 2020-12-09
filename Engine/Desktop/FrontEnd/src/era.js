import NetManager from './managers/net'
import { DisplayManager } from './managers/display'
import { StoreManager } from './managers/store'
export class Erajs {
  constructor() {
    this.dis = new DisplayManager()
    this.net = new NetManager('main')
    this.store = new StoreManager()
    this.net.on('recv', (pkg) => { this.net.send(pkg) })
    // this.dat.on('send', (pkg) => { })
  }

  start() {
    this.dis.start(this.store.getVueStore())
  }
}
const erajs = new Erajs()
erajs.start()
