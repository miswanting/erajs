// const { app } = require('electron')
const NetManager = require('./managers/net')
class Erajs {
  constructor () {
    // this.dat = new DataManager()
    this.dis = new DisplayManager()
    this.dis.start()
    this.net = new NetManager('main')
    this.net.start()
    this.net.on('recv', (pkg) => { store.commit('parsePackage', pkg) })
    document.addEventListener('send', data => {
      this.net.send(data.detail)
    })
  }
}
window.onload = () => {
  // const options = {
  //   store: store,
  //   template: '<i-program></i-program>'
  // }
  // window.app = Vue.createApp(options)
  // app.use(store)
  // components.forEach(component => {
  //   app.component(component[0], component[1])
  // })
  // app.mount('#app')
  const erajs = new Erajs()
}
