import NetManager from './managers/net'
import { DisplayManager } from './managers/display'
import { StoreManager } from './managers/store'
export class Erajs {
  constructor() {
    this.dis = new DisplayManager()
    this.net = new NetManager('main')
    this.store = new StoreManager(this.net)
    this.net.on('recv', (pkg) => { this.store.parsePackage(pkg) })
    // this.dat.on('send', (pkg) => { })
  }

  start() {
    this.dis.start(this.store.getVueStore())
  }
}
const erajs = new Erajs()
erajs.start()
