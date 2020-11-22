class DisplayManager {
  constructor() {
    document.body.addEventListener("mouseup", (e) => {
      console.log('[DEBG]鼠标点击：', e.which);
      let data = {
        type: 'MOUSE_CLICK',
        value: e.which
      }
      // this.app.pull(data)
      // console.log(data);
      store.commit('handleEvent', data)
    })
    document.body.addEventListener("keyup", (e) => {
      console.log('[DEBG]键盘按下：', e.key);
      if (e.key == '`') {
        if (store.state.ui != 'console') {
          store.state.lastUi = store.state.ui
          store.state.ui = 'console'
        } else if (store.state.ui == 'console') {
          store.state.ui = store.state.lastUi
        }
      } else if (e.key == 'Escape') {
        if (store.state.ui == 'main') {
          store.state.ui = 'pause'
        } else if (store.state.ui == 'pause') {
          store.state.ui = 'main'
        } else if (store.state.ui == 'mod-manager') {
          store.state.ui = 'main'
        } else if (store.state.ui == 'map-manager') {
          store.state.ui = 'main'
        }
      }
      let data = {
        type: 'KEY_UP',
        value: e.key
      }
      store.commit('handleEvent', data)
      // this.app.pull(data)
    })
  }

  start() {
    window.app = Vue.createApp({
      mounted() { this.$router.push('/idle') },
      render() { return Vue.h(VueRouter.RouterView) }
    })
    app.use(store)
    app.use(router)
    components.forEach(component => app.component(component[0], component[1]))
    app.mount('body')

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
  }
}