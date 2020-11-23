const { remote } = require('electron')
components.push(['frame-header', {
  data() {
    return {
      isMaxed: false
    }
  },
  methods: {
    operate(type) {
      if (type === 'min') {
        remote.getCurrentWindow().minimize()
      } else if (type === 'max') {
        if (this.isMaxed) { remote.getCurrentWindow().unmaximize() }
        else { remote.getCurrentWindow().maximize() }
        this.isMaxed = !this.isMaxed
      } else if (type === 'close') {
        remote.getCurrentWindow().close()
      }
    }
  },
  render() {
    const menuBarItems = []
    this.$store.state.menu.forEach(item => {
      menuBarItems.push(Vue.h(app.component('menu-item'), { data: item }))
    })
    return Vue.h('header', { class: 'header' }, [
      Vue.h('div', { class: 'menu-bar' }, menuBarItems),
      Vue.h('div', { class: 'title-bar' }, this.$store.state.title),
      Vue.h('div', { class: 'operate-bar' }, [
        Vue.h('div', { class: 'min', onClick: () => { this.operate('min') } }, '●'),
        Vue.h('div', { class: 'max', onClick: () => { this.operate('max') } }, '●'),
        Vue.h('div', { class: 'close', onClick: () => { this.operate('close') } }, '●')
      ])
    ])
  }
}])
components.push(['menu-item', {
  props: { data: Object },
  data() { return { show: false } },
  mounted() { document.addEventListener('click', this.documentClick) },
  unmounted() { document.addEventListener('click', this.documentClick) },
  methods: {
    click() {
      if (this.data.hasOwnProperty('submenu')) {
        this.show = !this.show
      } else if (this.data.hasOwnProperty('click')) {
        this.data.click()
      } else {
        this.$emit('MENU_CLICK', this.data.label)
      }
    },
    documentClick(e) {
      if (this.$el.contains(e.target)) {
        e.preventDefault()
      } else {
        this.show = false
      }
    }
  },
  render() {
    let node = null
    if (this.data.hasOwnProperty('label')) {
      if (this.data.hasOwnProperty('submenu') && this.show) {
        const l = []
        this.data.submenu.forEach(submenu => {
          l.push(Vue.h(app.component('menu-item'), { data: submenu }))
        })
        node = Vue.h('div', { class: 'menu-item' }, [
          Vue.h('div', { class: 'menu-button', onClick: this.click }, this.data.label),
          Vue.h('div', { class: 'menu-anchor' },
            Vue.h('div', { class: 'menu-list' }, l)
          )
        ])
      } else {
        node = Vue.h('div', { class: 'menu-item' },
          Vue.h('div', { class: 'menu-button', onClick: this.click }, this.data.label)
        )
      }
    } else if (this.data.hasOwnProperty('type') && this.data.type === 'separator') {
      node = Vue.h('div', { class: 'menu-separator' })
    }
    return node
  }
}])
