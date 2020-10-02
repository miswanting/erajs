const { remote } = require('electron')
window.components.push(['i-header', {
  template: `<header>
    <menu-bar></menu-bar>
    <i-title></i-title>
    <operator-bar></operator-bar>
  </header>`
}])
window.components.push(['menu-bar', {
  render() {
    for (let i = 0; i < this.$store.state.menu.length; i++) {
      const element = array[i];

    }
    return Vue.h('div', { class: 'menu-bar' }, [])
  }
}])
window.components.push(['i-menu', {
  template: `<div class="menu-bar">
    <i-menu v-for=""></i-menu>
  </div>`
}])
window.components.push(['i-title', {
  template: `<div class="title">
    {{this.$store.state.title}}
  </div>`
}])
window.components.push(['operator-bar', {
  methods: {
    min() { },
    max() { },
    close() { }
  },
  template: `<div class="operator-bar">
    <div class="operator min" @click="min()">●</div>
    <div class="operator max" @click="max()">●</div>
    <div class="operator close" @click="close()">●</div>
  </div>`
}])
