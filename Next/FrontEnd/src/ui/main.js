window.components.push(['i-main', {
  render() {
    return [
      Vue.h(app.component('i-header')),
      Vue.h(app.component('i-message')),
      Vue.h(app.component('i-container')),
      Vue.h(app.component('i-footer'))
    ]
  }
}])
window.components.push(['i-message', {
  render() {
    const msgList = []
    for (let i = 0; i < this.$store.state.msgs.length; i++) {
      msgList.push(
        Vue.h(app.component('i-message-item'), {
          key: this.$store.state.msgs[i].data.hash,
          data: this.$store.state.msgs[i]
        })
      )
    }
    return [
      Vue.h('div', { class: 'message' }, [
        Vue.h('div', { class: 'message-anchor' }, msgList)
      ])
    ]
  }
}])
window.components.push(['i-message-item', {
  props: {
    data: Object
  },
  mounted() {
    anime({
      targets: this.$el,
      translateX: [this.$el.clientWidth, 0],
      duration: 1000,
      easing: 'easeOutQuart',
      complete: (anim) => {
        setTimeout(() => {
          anime({
            targets: this.$el,
            translateX: [0, this.$el.clientWidth],
            duration: 1000,
            easing: 'easeInQuart',
            complete: (anim) => {
              this.$store.commit('handleEvent', {
                type: 'MSG_TIMEOUT',
                hash: this.data.data.hash
              })
            }
          })
        }, this.data.data.duration * 1000)
      }
    })
  },
  template: '<div class="message-item" :style=data.style>{{data.data.text}}</div>'
}])
window.components.push(['i-container', {
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
      Vue.h('main', {
        ref: 'main',
        class: 'span-charm'
      }, sections

      )
    ]
  }
}])
window.components.push(['i-disable-mask', {
  template: '<div class="disable-mask"></div>'
}])
window.components.push(['i-section', {
  props: {
    data: Object,
    disabled: Boolean
  },
  render() {
    const blocks = [Vue.h(app.component('i-disable-mask'))]
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
window.components.push(['i-footer', {
  template: '<footer>{{$store.state.footer}}</footer>'
}])
