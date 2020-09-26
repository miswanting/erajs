
Vue.component('i-inline', {
  props: {
    data: Object
  },
  render: function (createElement) {
    let inlineType = null
    if (this.data.type === 'text') { inlineType = 'i-text' } else if (this.data.type === 'button') { inlineType = 'i-button' } else if (this.data.type === 'heading') { inlineType = 'i-heading' } else if (this.data.type === 'link') { inlineType = 'i-link' } else if (this.data.type === 'progress') { inlineType = 'i-progress' } else if (this.data.type === 'rate') { inlineType = 'i-rate' } else if (this.data.type === 'check') { inlineType = 'i-check' } else if (this.data.type === 'radio') { inlineType = 'i-radio' } else if (this.data.type === 'input') { inlineType = 'i-input' } else if (this.data.type === 'dropdown') { inlineType = 'i-dropdown' } else { inlineType = 'i-other' }
    return createElement(inlineType, {
      props: {
        data: this.data
      }
    })
  }
})
Vue.component('i-text', {
  props: {
    data: Object
  },
  data: function () {
    return {
      shake: false
    }
  },
  mounted: function () {
    if (this.data.style.hasOwnProperty('shake_duration')) {
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, this.data.style.shake_duration * 1000)
    }
  },
  render: function (createElement) {
    return createElement('span',
      {
        class: {
          shake: this.shake,
          'shake-constant': this.shake
        },
        style: this.data.style
      },
      this.data.data.text
    )
  }
})
Vue.component('i-button', {
  props: {
    data: Object
  },
  methods: {
    click: function () {
      this.$root.pull({
        type: 'BUTTON_CLICK',
        hash: this.data.data.hash
      })
    }
  },
  render: function (createElement) {
    return createElement('span',
      {
        class: 'button',
        style: this.data.style,
        on: {
          click: this.click
        }
      },
      this.data.data.text
    )
  }
})
Vue.component('i-heading', {
  props: {
    data: Object
  },
  render: function (createElement) {
    return createElement('h' + this.data.data.rank.toString(),
      {
        style: this.data.style
      },
      this.data.data.text
    )
  }
})
Vue.component('i-link', {
  props: {
    data: Object
  },
  methods: {
    click: function () {
      this.$root.pull({
        type: 'LINK_CLICK',
        hash: this.data.data.hash
      })
    }
  },
  render: function (createElement) {
    return createElement('span',
      {
        class: 'link',
        style: this.data.style,
        on: {
          click: this.click
        }
      },
      this.data.data.text
    )
  }
})
Vue.component('i-progress', {
  props: {
    data: Object
  },
  render: function (createElement) {
    if (!this.data.style[0].hasOwnProperty('width')) {
      this.data.style[0].width = '100px'
    }
    this.data.style[1].width = `${this.data.data.now / this.data.data.max * 100}%`
    return createElement('span', {
      class: 'progress',
      style: this.data.style[0]
    },
    [
      createElement('span', {
        class: 'bar',
        style: this.data.style[1]
      },
      this.data.data.text
      )
    ]
    )
  }
})
Vue.component('i-rate', {
  props: {
    data: Object
  },
  data: function () {
    let falseIcon = '☆'
    let trueIcon = '★'
    if (this.data.style.hasOwnProperty('false_icon')) {
      falseIcon = this.data.style.false_icon
    }

    if (this.data.style.hasOwnProperty('true_icon')) {
      trueIcon = this.data.style.true_icon
    }
    return {
      now: this.data.data.now,
      falseIcon: falseIcon,
      trueIcon: trueIcon
    }
  },
  methods: {
    click: function (i) {
      if (i === this.now) {
        i = 0
      }
      this.$root.pull({
        type: 'RATE_CLICK',
        value: i,
        hash: this.data.data.hash
      })
      this.now = i
    }
  },
  render: function (createElement) {
    const rateList = []
    for (let i = 0; i < this.data.data.max; i++) {
      if (i < this.now) {
        rateList.push(
          createElement('span', {
            class: 'rate-item',
            on: {
              click: () => { this.click(i + 1) }
            }
          }, this.trueIcon))
      } else {
        rateList.push(
          createElement('span', {
            class: 'rate-item',
            on: {
              click: () => { this.click(i + 1) }
            }
          }, this.falseIcon))
      }
    }
    return createElement('span', {
      class: 'rate',
      style: this.data.style
    }, rateList)
  }
})
Vue.component('i-check', {
  props: {
    data: Object
  },
  data: function () {
    let falseIcon = '◻'
    let trueIcon = '◼'
    if (this.data.style.hasOwnProperty('false_icon')) {
      falseIcon = this.data.style.false_icon
    }

    if (this.data.style.hasOwnProperty('true_icon')) {
      trueIcon = this.data.style.true_icon
    }
    return {
      value: this.data.data.default,
      falseIcon: falseIcon,
      trueIcon: trueIcon
    }
  },
  methods: {
    click: function () {
      this.$root.pull({
        type: 'CHECK_CHANGE',
        value: !this.value,
        hash: this.data.data.hash
      })
      this.value = !this.value
    }
  },
  render: function (createElement) {
    const valueText = this.value ? this.trueIcon : this.falseIcon
    return createElement('span', {
      class: 'check',
      style: this.data.style,
      on: { click: this.click }
    },
    [
      createElement('span', {
        class: 'check-value'
      }, valueText),
      createElement('span', {
        class: 'check-text'
      }, this.data.data.text)
    ]
    )
  }
})
Vue.component('i-radio', {
  props: {
    data: Object
  },
  data: function () {
    let falseIcon = '◻'
    let trueIcon = '◼'
    if (this.data.style.hasOwnProperty('false_icon')) {
      falseIcon = this.data.style.false_icon
    }

    if (this.data.style.hasOwnProperty('true_icon')) {
      trueIcon = this.data.style.true_icon
    }
    return {
      value: this.data.data.default_index,
      falseIcon: falseIcon,
      trueIcon: trueIcon
    }
  },
  methods: {
    click: function (i) {
      this.$root.pull({
        type: 'RADIO_CHANGE',
        value: i,
        hash: this.data.data.hash
      })
      this.value = i
    }
  },
  render: function (createElement) {
    const radioList = []
    for (let i = 0; i < this.data.data.text_list.length; i++) {
      const valueText = this.value === i ? this.trueIcon : this.falseIcon
      radioList.push(
        createElement('span', {
          class: 'radio-item',
          style: this.data.style,
          on: {
            click: () => { this.click(i) }
          }
        }, [
          createElement('span', {
            class: 'radio-value'
          }, valueText),
          createElement('span', {
            class: 'radio-text'
          }, this.data.data.text_list[i])
        ])
      )
    }
    return createElement('span',
      {
        class: 'radio',
        style: this.data.style
      },
      radioList
    )
  }
})
Vue.component('i-input', {
  props: {
    data: Object
  },
  data: function () {
    return {
      value: this.data.data.default
    }
  },
  template: '<span class="input" style=style>[<editable :data=data :content.sync="value"></editable>]</span>'
})
Vue.component('editable', {
  template: '<span contenteditable="true" @input="$emit(\'update:content\', $event.target.innerText)"></span>',
  props: ['data', 'content'],
  mounted: function () {
    this.$el.innerText = this.content
  },
  watch: {
    content: function () {
      this.$root.pull({
        type: 'INPUT_CHANGE',
        value: this.content,
        hash: this.data.data.hash
      })
    }
  }
})
Vue.component('i-dropdown', {
  props: {
    data: Object
  },
  data: function () {
    return {
      icon: '△',
      show: false,
      value: this.data.data.default_index
    }
  },
  methods: {
    click: function () {
      this.show = !this.show
    },
    clickItem: function (i) {
      this.value = i
      this.$root.pull({
        type: 'DROPDOWN_CHANGE',
        value: i,
        hash: this.data.data.hash
      })
    },
    documentClick: function (e) {
      if (['dropdown-item', 'dropdown-icon'].indexOf(e.target.className) !== -1) {
        e.preventDefault()
      } else {
        this.show = false
      }
    }
  },
  created () { document.addEventListener('click', this.documentClick) },
  destroyed () { document.removeEventListener('click', this.documentClick) },
  render: function (createElement) {
    const itemList = []
    itemList.push(createElement('span', {
      class: 'dropdown-item'
    }, this.data.data.text_list[this.value]))
    itemList.push(createElement('span', {
      class: 'dropdown-icon'
    }, this.icon))
    if (this.show) {
      const menuItemList = []
      for (let i = 0; i < this.data.data.text_list.length; i++) {
        menuItemList.push(createElement('div', {
          class: 'dropdown-menu-item',
          on: {
            click: (e) => {
              this.clickItem(i)
              e.preventDefault()
            }
          }
        }, this.data.data.text_list[i]))
      }
      itemList.push(createElement('div', {
        class: 'dropdown-anchor'
      }, [
        createElement('div', {
          class: 'dropdown-menu show'
        }, menuItemList)
      ]))
    }
    return createElement('span', {
      class: 'dropdown',
      style: this.data.style,
      on: {
        click: this.click
      }
    }, itemList)
  }
})
Vue.component('i-other', {
  props: {
    data: Object
  },
  render: function (createElement) {
    console.log(this.data)
    return createElement('span',
      {},
      JSON.stringify(this.data)
    )
  }
})
