const { VUEJS_DEVTOOLS } = require("electron-devtools-installer")

window.components.push(['i-console', {
  template: '<i-header></i-header><console-main></console-main>'
}])
window.components.push(['console-main', {

  render() {
    const ioList = []
    for (let i = 0; i < this.$store.state.console.children.length; i++) {
      if (this.$store.state.console.children[i].type === 'input') {
        ioList.push(Vue.h(app.component('console-input'), { data: this.$store.state.console.children[i], disabled: true }))
      } else if (this.$store.state.console.children[i].type === 'output') {
        ioList.push(Vue.h(app.component('console-input'), { data: this.$store.state.console.children[i], disabled: true }))
      }
    }
    ioList.push(Vue.h(app.component('console-input'), { data: {}, disabled: false }))
    return Vue.h('main', { class: 'console' }, ioList)
  }
}])
window.components.push(['console-input', {
  props: {
    data: Object,
    disabled: Boolean
  },
  template: '<div><span>$></span><span contenteditable></span></div>'
}])
window.components.push(['console-output', {
  template: '<div><span>$></span><span contenteditable></span></div>'
}])
