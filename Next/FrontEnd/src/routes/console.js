routes.push({
  path: '/console',
  component: {
    mounted() { this.$refs.console.addEventListener('mouseup', this.focus) },
    unmounted() { this.$refs.console.removeEventListener('mouseup', this.focus) },
    methods: {
      focus() {
        document.querySelector('#input-span').focus()
      }
    },
    render() {
      const ios = this.$store.state.console.children.map(io => {
        return Vue.h(app.component('console-interact'), { data: io })
      })
      return [
        Vue.h(app.component('frame-header')),
        Vue.h('main', { class: 'console', ref: 'console', ios }, ios),
      ]
    }
  }
})
window.components.push(['console-interact', {
  props: { data: Object },
  render() {
    return [
      Vue.h('div', { class: 'console-input' }),
      Vue.h('div', { class: 'console-output' }, this.data.data.value)
    ]
  }
}])