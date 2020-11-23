const NetManager = require('./managers/net')
class Erajs {
  constructor() {
    // this.dat = new DataManager()
    this.dis = new DisplayManager()
    this.net = new NetManager('main')
    this.net.on('recv', (pkg) => { store.commit('parsePackage', pkg) })
    document.addEventListener('send', data => {
      this.net.send(data.detail)
    })
  }

  start() {
    this.dis.start()
    this.net.start()
  }
}
addEventListener('load', function () {
  const erajs = new Erajs()
  erajs.start()
})
