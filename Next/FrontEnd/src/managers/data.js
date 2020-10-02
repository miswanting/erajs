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
      menu: [
        {
          label: '文件',
          submenu: [
            { label: '新建' },
            { label: '打开' },
            {
              label: '最近打开的文件',
              submenu: [
                { label: 'File 1' },
                { label: 'File 2' },
                { label: 'File 3' }
              ]
            }
          ]
        },
        { label: '编辑' },
        { label: '窗口' },
        { label: '帮助' },
        { label: '+' }
      ],
      console: {},
      pause: {},
      main: {},
      intro: {}
    }
  }
})
