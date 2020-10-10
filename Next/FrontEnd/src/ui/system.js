window.components.push(['i-program', {
  render () {
    if (this.$store.state.ui === 'console') {
      return Vue.h(app.component('i-console'))
    } else if (this.$store.state.ui === 'intro') {
      return Vue.h(app.component('i-intro'))
    } else if (this.$store.state.ui === 'pause') {
      return Vue.h(app.component('i-pause'))
    } else if (this.$store.state.ui === 'main') {
      return Vue.h(app.component('i-main'))
    } else if (this.$store.state.ui === 'mod-manager') {
      return Vue.h(app.component('i-mod-manager'))
    }
  }
}])
