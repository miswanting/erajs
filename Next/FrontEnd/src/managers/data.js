window.store = Vuex.createStore({
  state () {
    return {
      style: {},
      title: 'Era.js',
      footer: '@Miswanting',
      maxPages: 10,
      lastUi: '',
      ui: 'intro',
      msgs: [],
      blockMode: { type: 'line' },
      loadingTitle: 'Loading...',
      loadingText: 'If there is no connection for a long time,\nyou may need to manually start the backend.',
      menu: [{
        label: '文件',
        submenu: [
          { label: '新建' },
          { label: '打开' },
          { type: 'separator' },
          {
            label: '最近打开的文件',
            submenu: [
              { label: 'File 1' },
              { label: 'File 2' },
              { label: 'File 3' }
            ]
          },
          { type: 'separator' }
        ]
      },
      { label: '编辑' },
      { label: '窗口' },
      { label: '帮助' },
      { label: '+' }],
      console: AST.newElement('console'),
      pause: AST.newElement('pause'),
      main: AST.newElement('main'),
      intro: AST.newElement('intro')
    }
  },
  mutations: {
    changeUI () { },
    appendComponent () { },
    parsePackage (state, pkg) {
      console.log('Parse:', pkg)
      if (pkg.type === 'connection') {
        state.ui = 'intro'
      } else if (pkg.type === 'set_loading_title') {
        state.loadingTitle = pkg.value
      } else if (pkg.type === 'set_loading_text') {
        state.loadingText = pkg.value
      } else if (pkg.type === 'loaded') {
        state.ui = 'main'
      } else if (pkg.type === 'title') {
        state.title = pkg.data.text
      } else if (pkg.type === 'msg') {
        const n = new Uint8Array(1)
        window.crypto.getRandomValues(n)
        pkg.data.hash = n[0]
        state.msgs.push(pkg)
      } else if (pkg.type === 'footer') {
        state.footer = pkg.data.text
      } else if (pkg.type === 'mode') {
        state.blockMode = { type: pkg.data.type }
        if (state.blockMode.type === 'grid') {
          state.blockMode.column = pkg.data.arg[0]
        }
      } else if (pkg.type === 'pass') {
        if (state.blockMode.type === 'line') {
          AST.addBlock(state)
        } else if (state.blockMode.type === 'grid') {
          if (!AST.isBlockSame(state)) {
            AST.addBlock(state)
          }
          AST.getLastBlock(state).children.push(AST.newElement('pass'))
        }
      } else if ([
        'page',
        'text',
        'button',
        'heading',
        'link',
        'progress',
        'rate',
        'check',
        'radio',
        'input',
        'dropdown',
        'divider'
      ].indexOf(pkg.type) !== -1) {
        AST.push(state, pkg)
      }
      console.log('Final:', state)
    },
    handleEvent (state, pkg) {
      if ([
        'MOUSE_CLICK',
        'KEY_UP',
        'BUTTON_CLICK',
        'LINK_CLICK',
        'RATE_CLICK',
        'CHECK_CHANGE',
        'RADIO_CHANGE',
        'INPUT_CHANGE',
        'DROPDOWN_CHANGE'
      ].indexOf(pkg.type) !== -1) {
        const event = new CustomEvent('send', { detail: pkg })
        document.dispatchEvent(event)
      } else if (pkg.type === 'MSG_TIMEOUT') {
        for (let i = 0; i < state.msgs.length; i++) {
          if (state.msgs[i].data.hash === pkg.hash) {
            state.msgs.splice(i, 1)
            break
          }
        }
      }
    }
  }
})
