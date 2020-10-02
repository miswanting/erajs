// const { json } = require("d3")

Vue.component('i-main', {
  props: {
    data: Object
  },
  template: '<body class="main"><i-header :data=data></i-header><i-message :data=data></i-message><i-container :data=data></i-container><i-footer :data=data></i-footer></body>'
})
Vue.component('i-container', {
  props: {
    data: Object
  },
  watch: {
    data: {
      deep: true,
      handler (newValue, oldValue) {
        this.$nextTick(function () {
          const el = this.$refs.main
          console.log(el)
          el.scrollTop = el.scrollHeight
        })
      }
    }
  },
  render: function (createElement) {
    const sections = []
    for (let i = 0; i < this.data.children.main.children.length; i++) {
      sections.push(createElement('i-section',
        {
          key: i,
          props: {
            data: this.data.children.main.children[i],
            disabled: i < this.data.children.main.children.length - 1
          }
        }
      ))
    }
    return createElement(
      'main',
      {
        ref: 'main',
        class: {
          'span-charm': true
        }
      },
      sections
    )
  }
})
Vue.component('i-section', {
  props: {
    data: Object,
    disabled: Boolean
  },
  render: function (createElement) {
    const blocks = [createElement('i-disable-mask')]
    for (let i = 0; i < this.data.children.length; i++) {
      blocks.push(createElement('i-block',
        {
          key: i,
          props: {
            data: this.data.children[i]
          }
        }
      ))
    }
    return createElement('section', {
      class: {
        page: true,
        disabled: this.disabled
      },
      style: this.data.style
    }, blocks)
  }
})
Vue.component('i-disable-mask', {
  template: '<div class="disable-mask"></div>'
})
Vue.component('i-message', {
  props: {
    data: Object
  },
  render: function (createElement) {
    const msgList = []
    for (let i = 0; i < this.data.data.msgs.length; i++) {
      msgList.push(
        createElement('i-message-item', {
          props: {
            data: this.data.data.msgs[i]
          }
        })
      )
    }
    return createElement('div', {
      class: 'message'
    }, [
      createElement('div', {
        class: 'message-anchor'
      }, msgList)
    ])
  }
})
Vue.component('i-message-item', {
  props: {
    data: Object
  },
  created: function () {
    setTimeout(() => {
      this.$root.pull({
        type: 'MSG_TIMEOUT'
      })
    }, 3000)
  },
  render: function (createElement) {
    return createElement('div', {
      class: 'message-item'
    }, this.data.data.text)
  }
})
