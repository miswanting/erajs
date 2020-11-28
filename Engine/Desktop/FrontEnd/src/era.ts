import { NetManager } from './managers/net'
import { DisplayManager } from './managers/display'
import { StoreManager } from './managers/store'
import { RouterManager } from './managers/router'
import './style/era.styl'
export class Erajs {
  dis: DisplayManager
  net: NetManager
  store: StoreManager
  router: RouterManager
  constructor () {
    this.store = new StoreManager()
    this.router = new RouterManager()
    this.dis = new DisplayManager()
    this.net = new NetManager('main')
    this.net.on('recv', (pkg) => { })
    this.dis.on('send', (pkg) => { })
  }

  start () {
    this.dis.start()
    this.net.start()
  }
}
