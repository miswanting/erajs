const { remote } = require('electron')
components.push(['i-header', {
  template: `<header>
    <menu-bar></menu-bar>
    <i-title></i-title>
    <operator-bar></operator-bar>
  </header>`
}])
components.push(['menu-bar', {
  methods: {
    generateMenus(menu) {
      const menus = []
      return menus
    }
  },
  render() {
    menus = []
    for (let i = 0; i < this.$store.state.menu.length; i++) {
      menus.push(
        Vue.h(
          app.component('i-menu'),
          {
            data: this.$store.state.menu[i]
          }
        )
      )
    }
    return Vue.h('div', { class: 'menu-bar' }, menus)
  }
}])
components.push(['i-menu', {
  props: {
    data: Object
  },
  data() {
    return { show: false }
  },
  methods: {
    click() {
      if (this.data.hasOwnProperty('submenu')) {
        this.show = !this.show
      } else {
        this.$emit('MENU_CLICK', this.data.label)
      }
    },
    documentClick(e) {
      if (e.target.className === 'menu-button') {
        e.preventDefault()
      } else {
        this.show = false
      }
    }
  },
  mounted() { document.addEventListener('click', this.documentClick) },
  unmounted() { document.addEventListener('click', this.documentClick) },
  render() {
    const menuStruct = [
      Vue.h('div', { class: 'menu-button', onClick: this.click }, this.data.label)
    ]
    if (this.data.hasOwnProperty('submenu') && this.show) {
      const submenus = []
      for (let i = 0; i < this.data.submenu.length; i++) {
        submenus.push(
          Vue.h(app.component('i-menu'),
            {
              data: this.data.submenu[i],
              onMENU_CLICK: (label) => {
                this.show = false
                this.$emit('MENU_CLICK', label)
              }
            }
          )
        )
      }
      menuStruct.push(
        Vue.h('div', { class: 'menu-anchor' }, [
          Vue.h('div', { class: 'menu-list' }, submenus)
        ])
      )
    }
    return Vue.h('div', { class: 'menu' }, menuStruct)
  }
}])
components.push(['i-title', {
  template: `<div class="title">
    {{this.$store.state.title}}
  </div>`
}])
components.push(['operator-bar', {
  data() {
    return {
      isMax: false
    }
  },
  methods: {
    min() { remote.getCurrentWindow().minimize() },
    max() {
      if (this.isMax) {
        remote.getCurrentWindow().unmaximize()
      } else {
        remote.getCurrentWindow().maximize()
      }
      this.isMax = !this.isMax
    },
    close() { remote.getCurrentWindow().close() }
  },
  template: `<div class="operator-bar">
    <div class="operator min" @click="min()">●</div>
    <div class="operator max" @click="max()">●</div>
    <div class="operator close" @click="close()">●</div>
  </div>`
}])
