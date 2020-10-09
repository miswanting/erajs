window.components.push(['i-console', {
  template: '<i-header></i-header><console-main></console-main>'
}])
window.components.push(['console-main', {
  mounted() { this.$refs.console.addEventListener('mouseup', this.focus) },
  unmounted() { this.$refs.console.removeEventListener('mouseup', this.focus) },
  methods: {
    focus() {
      document.querySelector('#input-span').focus()
    }
  },
  render() {
    const ioList = []
    for (let i = 0; i < this.$store.state.console.children.length; i++) {
      if (this.$store.state.console.children[i].type === 'input') {
        ioList.push(Vue.h(app.component('console-input'), { data: this.$store.state.console.children[i], disabled: true }))
      } else if (this.$store.state.console.children[i].type === 'output') {
        ioList.push(Vue.h(app.component('console-output'), { data: this.$store.state.console.children[i] }))
      }
    }
    return Vue.h('main', { class: 'console', ref: "console" }, [
      ioList,
      Vue.h(app.component('console-input'), { data: {}, disabled: false })
    ])
  }
}])
window.components.push(['console-input', {
  props: {
    data: Object,
    disabled: Boolean
  },
  mounted() {
    console.log();
    this.$el.addEventListener('keyup', this.keyUp)
  },
  unmounted() { this.$el.removeEventListener('keyup', this.keyUp) },
  methods: {
    keyUp(e) {
      if (!this.disabled && e.key === 'Enter') {
        let pkg = {
          type: 'CONSOLE_INPUT',
          value: document.querySelector('#input-span').innerText.trim()
        }
        console.log(pkg);
        document.querySelector('#input-span').innerText = ''
        store.commit('handleEvent', pkg)
        this.$nextTick(() => { this.$refs.input.focus() })
      }
    }
  },
  render() {
    return Vue.h('div', {
      class: ['console-input', { disabled: this.disabled }],
    }, [
      Vue.h('span', {}, '$>'),
      Vue.h('span', {
        id: this.disabled ? '' : 'input-span',
        ref: 'input',
        contenteditable: this.disabled ? 'false' : 'true'
      }, this.disabled ? this.data.data.value : '')
    ])
  }
}])
window.components.push(['console-output', {
  props: {
    data: Object,
  },
  template: '<div class="console-output"><span>{{data.data.value}}</span></div>'
}])
