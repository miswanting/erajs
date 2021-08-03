import DisplayManager from './managers/display'
import StoreManager from './managers/store'
import NetManager from './managers/net'
window.addEventListener('load', function () {
  window.net = new NetManager()
  window.store = new StoreManager()
  const dm = new DisplayManager()
  dm.start()
})
