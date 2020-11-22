routes.push({
  path: '/',
  component: {
    methods: {},
    mounted() { },
    watch: {
      '$store.state.main': {
        deep: true,
        handler(newValue, oldValue) {
          this.$nextTick(() => {
            const el = this.$refs.main
            el.scrollTop = el.scrollHeight
          })
        }
      }
    },
    render() {
      const sections = []
      for (let i = 0; i < this.$store.state.main.children.length; i++) {
        sections.push(Vue.h(app.component('i-section'), {
          data: this.$store.state.main.children[i],
          disabled: i < this.$store.state.main.children.length - 1
        }))
      }
      return [
        Vue.h(app.component('frame-header')),
        Vue.h(app.component('msg-system')),
        Vue.h('main', { class: 'span-charm', ref: 'main' }, sections),
        Vue.h('footer', { class: 'footer' }, this.$store.state.footer)
      ]
    }
  }
})
window.components.push(['i-section', {
  props: {
    data: Object,
    disabled: Boolean
  },
  render() {
    const blocks = [Vue.h('div', { class: 'disable-mask' })]
    for (let i = 0; i < this.data.children.length; i++) {
      blocks.push(Vue.h(app.component('i-block'), {
        data: this.data.children[i]
      }))
    }
    return [
      Vue.h('section', {
        class: {
          page: true,
          disabled: this.disabled
        },
        style: this.data.style
      }, blocks)
    ]
  }
}])