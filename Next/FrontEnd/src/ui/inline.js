window.components.push(['i-inline', {
  props: {
    data: Object
  },
  render() {
    let inlineType = null
    if (this.data.type === 'text') {
      inlineType = 'i-text'
    } else if (this.data.type === 'button') {
      inlineType = 'i-button'
    } else if (this.data.type === 'heading') {
      inlineType = 'i-heading'
    } else if (this.data.type === 'link') {
      inlineType = 'i-link'
    } else if (this.data.type === 'progress') {
      inlineType = 'i-progress'
    } else if (this.data.type === 'rate') {
      inlineType = 'i-rate'
    } else if (this.data.type === 'check') {
      inlineType = 'i-check'
    } else if (this.data.type === 'radio') {
      inlineType = 'i-radio'
    } else if (this.data.type === 'input') {
      inlineType = 'i-input'
    } else if (this.data.type === 'dropdown') {
      inlineType = 'i-dropdown'
    } else {
      inlineType = 'i-other'
    }
    return [
      Vue.h(app.component(inlineType), {
        data: this.data
      })
    ]
  }
}])
window.components.push(['i-text', {
  props: {
    data: Object
  },
  data: function () {
    return {
      shake: false
    }
  },
  mounted() {
    if (this.data.style.hasOwnProperty('shake_duration')) {
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, this.data.style.shake_duration * 1000)
    }
  },
  render() {
    return [
      Vue.h('span', {
        class: {
          shake: this.shake,
          'shake-constant': this.shake
        },
        style: this.data.style
      }, this.data.data.text)
    ]
  }
}])
window.components.push(['i-button', {
  props: {
    data: Object
  },
  data() {
    return {
      showPopup: false,
      tippy: null
    }
  },
  methods: {
    click() {
      if (!this.data.data.disabled) {
        this.$store.commit('handleEvent', {
          type: 'BUTTON_CLICK',
          hash: this.data.data.hash
        })
      }
    },
    hover(e) {
      this.tippy.show()
    },
    notHover(e) {
      this.tippy.hide()
    }
  },
  mounted() {
    if (this.data.data.popup) {
      this.tippy = tippy(this.$refs.button, {
        content: this.data.data.popup,
        theme: 'span-charm'
      })
      this.$refs.button.addEventListener('mouseenter', this.show)
      this.$refs.button.addEventListener('mouseleave', this.hide)
    }
  },
  unmounted() {
    if (this.data.data.popup) {
      this.tippy.unmount()
      this.tippy.destroy()
      this.$refs.button.removeEventListener('mouseenter', this.show)
      this.$refs.button.removeEventListener('mouseleave', this.hide)
    }
  },
  render() {
    return [
      Vue.h('span', {
        class: {
          button: true,
          disabled: this.data.data.disabled
        },
        style: this.data.style,
        onClick: this.click,
        ref: 'button'
      }, this.data.data.text)
    ]
  }
}])
window.components.push(['i-heading', {
  props: {
    data: Object
  },
  data: function () {
    return {
      shake: false
    }
  },
  mounted() {
    if (this.data.style.hasOwnProperty('shake_duration')) {
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, this.data.style.shake_duration * 1000)
    }
  },
  render() {
    return [
      Vue.h('h' + this.data.data.rank.toString(), {
        class: {
          shake: this.shake,
          'shake-constant': this.shake
        },
        style: this.data.style
      }, this.data.data.text)
    ]
  }
}])
window.components.push(['i-link', {
  props: {
    data: Object
  },
  methods: {
    click() {
      this.$store.commit('handleEvent', {
        type: 'LINK_CLICK',
        hash: this.data.data.hash
      })
    }
  },
  render() {
    return [
      Vue.h('span', {
        class: 'link',
        style: this.data.style,
        onClick: this.click
      }, this.data.data.text)
    ]
  }
}])
window.components.push(['i-progress', {
  props: {
    data: Object
  },
  render() {
    if (!this.data.style[0].hasOwnProperty('width')) {
      this.data.style[0].width = '100px'
    }
    this.data.style[1].width = `${this.data.data.now / this.data.data.max * 100}%`
    return [
      Vue.h('span', {
        class: 'progress',
        style: this.data.style[0]
      }, [
        Vue.h('span', {
          class: 'bar',
          style: this.data.style[1]
        }, this.data.data.text)
      ])
    ]
  }
}])
window.components.push(['i-rate', {
  props: {
    data: Object
  },
  data() {
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
    click(i) {
      if (!this.data.data.disabled) {
        if (i === this.now) {
          i = 0
        }
        this.$store.commit('handleEvent', {
          type: 'RATE_CLICK',
          value: i,
          hash: this.data.data.hash
        })
        this.now = i
      }
    }
  },
  render() {
    const rateList = []
    for (let i = 0; i < this.data.data.max; i++) {
      if (i < this.now) {
        rateList.push(
          Vue.h('span', {
            class: 'rate-item',
            onClick: () => { this.click(i + 1) }
          }, this.trueIcon))
      } else {
        rateList.push(
          Vue.h('span', {
            class: 'rate-item',
            onClick: () => { this.click(i + 1) }
          }, this.falseIcon))
      }
    }
    return [
      Vue.h('span', {
        class: {
          rate: true,
          disabled: this.data.data.disabled
        },
        style: this.data.style
      }, rateList)
    ]
  }
}])
window.components.push(['i-check', {
  props: {
    data: Object
  },
  data() {
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
    click() {
      this.$store.commit('handleEvent', {
        type: 'CHECK_CHANGE',
        value: !this.value,
        hash: this.data.data.hash
      })
      this.value = !this.value
    }
  },
  render() {
    const valueText = this.value ? this.trueIcon : this.falseIcon
    return [
      Vue.h('span', {
        class: 'check',
        style: this.data.style,
        onClick: this.click
      }, [
        Vue.h('span', {
          class: 'check-value'
        }, valueText),
        Vue.h('span', {
          class: 'check-text'
        }, this.data.data.text)
      ])
    ]
  }
}])
window.components.push(['i-radio', {
  props: {
    data: Object
  },
  data() {
    let falseIcon = '◻'
    let trueIcon = '◼'
    if (this.data.style.hasOwnProperty('false_icon')) {
      falseIcon = this.data.style.false_icon
    }
    if (this.data.style.hasOwnProperty('true_icon')) {
      trueIcon = this.data.style.true_icon
    }
    return {
      index: this.data.data.default_index,
      falseIcon: falseIcon,
      trueIcon: trueIcon
    }
  },
  methods: {
    click(i) {
      this.$store.commit('handleEvent', {
        type: 'RADIO_CHANGE',
        index: i,
        hash: this.data.data.hash
      })
      this.index = i
    }
  },
  render() {
    const radioList = []
    for (let i = 0; i < this.data.data.text_list.length; i++) {
      const icon = this.index === i ? this.trueIcon : this.falseIcon
      radioList.push(
        Vue.h('span', {
          class: 'radio-item',
          style: this.data.style,
          onClick: () => { this.click(i) }
        }, [
          Vue.h('span', {
            class: 'radio-value'
          }, icon),
          Vue.h('span', {
            class: 'radio-text'
          }, this.data.data.text_list[i])
        ])
      )
    }
    return [
      Vue.h('span', {
        class: 'radio',
        style: this.data.style
      }, radioList)
    ]
  }
}])
window.components.push(['i-input', {
  props: {
    data: Object
  },
  data() {
    return {
      value: this.data.data.default
    }
  },
  mounted() {
    this.$refs.input.innerText = this.value
  },
  watch: {
    value() {
      this.$store.commit('handleEvent', {
        type: 'INPUT_CHANGE',
        value: this.value,
        hash: this.data.data.hash
      })
    }
  },
  render() {
    return Vue.h('span', {
      class: 'input',
      style: this.data.style
    }, [
      '[',
      Vue.h('span', {
        ref: 'input',
        contenteditable: 'true',
        onInput: $event => {
          this.value = $event.target.innerText
        }
      }),
      ']'
    ])
  }
}])
window.components.push(['i-dropdown', {
  props: {
    data: Object
  },
  data() {
    return {
      icon: '△',
      show: false,
      value: this.data.data.default_index
    }
  },
  mounted() { document.addEventListener('click', this.documentClick) },
  unmounted() { document.removeEventListener('click', this.documentClick) },
  methods: {
    click() {
      this.show = !this.show
    },
    clickItem() {
      this.value = i
      this.$store.commit('handleEvent', {
        type: 'DROPDOWN_CHANGE',
        value: i,
        hash: this.data.data.hash
      })
    },
    documentClick(e) {
      if (['dropdown-item', 'dropdown-icon'].indexOf(e.target.className) !== -1) {
        e.preventDefault()
      } else {
        this.show = false
      }
    }
  },
  render() {
    const itemList = []
    itemList.push(Vue.h('span', {
      class: 'dropdown-item'
    }, this.data.data.text_list[this.value]))
    itemList.push(Vue.h('span', {
      class: 'dropdown-icon'
    }, this.icon))
    if (this.show) {
      const menuItemList = []
      for (let i = 0; i < this.data.data.text_list.length; i++) {
        menuItemList.push(Vue.h('div', {
          class: 'dropdown-menu-item',
          onClick: (e) => {
            this.clickItem(i)
            e.preventDefault()
          }
        }, this.data.data.text_list[i]))
      }
      itemList.push(Vue.h('span', {
        class: 'dropdown-anchor'
      }, [
        Vue.h('div', {
          class: 'dropdown-menu show'
        }, menuItemList)
      ]))
    }
    return [
      Vue.h('span', {
        class: 'dropdown',
        style: this.data.style,
        onClick: this.click
      }, itemList)
    ]
  }
}])
window.components.push(['i-other', {
  props: {
    data: Object
  },
  render() {
    console.log(this.data)
    return [
      Vue.h('span', {}, JSON.stringify(this.data))
    ]
  }
}])
