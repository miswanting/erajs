components.push(['i-mod-manager', {
  template: '<i-header></i-header><mod-main></mod-main>'
}])
components.push(['mod-main', {
  render() {
    const modList = [
      Vue.h('div', { class: 'mod-item' }, [
        '∷',
        '◻',
        'TestMod1'
      ]),
      Vue.h('div', { class: 'mod-item' }, [
        '∷',
        '◼',
        'TestMod2'
      ]),
      Vue.h('div', { class: 'mod-item' }, [
        '∷',
        '◻',
        'TestMod3'
      ]),
      Vue.h('div', { class: 'mod-item' }, [
        '∷',
        '◻',
        'TestMod4'
      ]),
    ]
    return Vue.h('main', { class: 'mod' }, [
      Vue.h('div', { class: 'left-panel' }, [
        Vue.h('div', { class: 'mod-title-bar' }, [
          Vue.h('div', { class: 'mod-back-btn' }, '←'),
          Vue.h('div', { class: 'mod-title' }, 'ModManager')
        ]),
        Vue.h('div', { class: 'mod-list' }, modList)
      ]),
      Vue.h('div', { class: 'right-panel' }, [
        Vue.h('div', { class: 'mod-content-title' }, 'TestMod2'),
        Vue.h('div', { class: 'mod-content-version' }, 'v1.2.3'),
        Vue.h('div', { class: 'mod-content-description' }, '一些注释。')
      ])
    ])
  }
}])
