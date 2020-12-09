import { createStore } from 'vuex'
import { AST } from './ast'
export class StoreManager {
  constructor () {
    this.store = createStore({
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
          loadTitle: 'Loading...',
          loadText: 'If there is no connection for a long time,\nyou may need to manually start the backend.',
          menu: generateMenu(),
          console: AST.newElement('console'),
          pause: AST.newElement('pause'),
          main: AST.newElement('main'),
          intro: AST.newElement('intro'),
          map: AST.newElement('map'),
          space: AST.newElement('space')
        }
      },
      mutations: {}
    })
  }

  getVueStore () { return this.store }
}

function generateMenu () {
  return [{
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
  {
    label: '工具',
    submenu: [
      {
        label: '模组管理器',
        click: () => {
          store.state.ui = 'mod-manager'
        }
      }, {
        label: '地图管理器',
        click: () => {
          store.state.ui = 'map-manager'
        }
      }
    ]
  },
  { label: '帮助' },
  { label: '+' }]
}
