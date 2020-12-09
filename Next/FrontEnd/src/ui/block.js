window.components.push(['i-block', {
  props: {
    data: Object
  },
  render () {
    let blockType = null
    if (this.data.type === 'line') {
      blockType = 'i-line'
    } else if (this.data.type === 'grid') {
      blockType = 'i-grid'
    } else if (this.data.type === 'divider') {
      blockType = 'i-divider'
    }
    return [
      Vue.h(app.component(blockType), {
        data: this.data
      })
    ]
  }
}])
window.components.push(['i-line', {
  props: {
    data: Object
  },
  render () {
    const inlines = []
    if (this.data.children.length === 0) {
      inlines.push(Vue.h('br'))
    } else {
      for (let i = 0; i < this.data.children.length; i++) {
        inlines.push(Vue.h(app.component('i-inline'), {
          data: this.data.children[i]
        }))
      }
    }
    return [
      Vue.h('div', {
        class: 'line'
      }, inlines)
    ]
  }
}])
window.components.push(['i-grid', {
  props: {
    data: Object
  },
  render () {
    const columns = []
    let column = []
    var alignment = this.data.data.alignment.split('').map(
      (a) => ({c:'center',l:'left',r:'right'}[a])
    )
    for (let i = 0; i < this.data.children.length; i++) {
      const rawElement = this.data.children[i]
      if (rawElement.type !== 'pass') {
        column.push(Vue.h(app.component('i-inline'), {
          data: rawElement
        }))
      } else {
        if (column.length === 0) {
          column.push(Vue.h('br'))
        }
        columns.push(Vue.h('td', {
          style: {'text-align': [alignment.shift()]}
        }, column))
        column = []
      }
    }
    if (column.length === 0) {
      column.push(Vue.h('br'))
    }
    columns.push(Vue.h('td', {
      style: null
    }, column))
    const rows = []
    for (let i = 0; i < Math.ceil(columns.length / this.data.data.column); i++) {
      const row = []
      for (let j = 0; j < this.data.data.column; j++) {
        if (i * this.data.data.column + j < columns.length) {
          row.push(columns[i * this.data.data.column + j])
        } else {
          row.push(Vue.h('tr', {
            style: null
          }))
        }
      }
      rows.push(Vue.h('tr', {
        style: null
      }, row))
    }
    return [
      Vue.h('table', {
        class: 'line',
        style: null
      },
      Vue.h('tbody', {
        style: null
      }, rows)
      )
    ]
  }
}])
window.components.push(['i-divider', {
  props: {
    data: Object
  },
  render () {
    if (this.data.data.text == null) {
      elements = [Vue.h('div', {class: 'divider-line'})]
    } else {
      elements = [
        Vue.h('div', {
          class: 'divider-line'
        }),
        Vue.h('div', {
          class: 'divider-text'
        }, this.data.data.text),
        Vue.h('div', {
          class: 'divider-line'
        })
      ]
    }
    return [
      Vue.h('div', {
        class: 'divider'
      }, elements)
    ]
  }
}])
