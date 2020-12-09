import { EventEmitter } from 'events'
import { createStore } from 'vuex'
import { AST } from './ast'
export class StoreManager extends EventEmitter {
  constructor() {
    super()
    this.store = createStore({
      state() {
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
      mutations: {
        parsePackage(state, pkg) {
          console.log('Parse:', pkg)
          if (pkg.type === 'connection') {
            window.router.push('/idle')
          } else if (pkg.type === 'set_loading_title') {
            state.loadTitle = pkg.data.value
          } else if (pkg.type === 'set_loading_text') {
            state.loadText = pkg.data.value
          } else if (pkg.type === 'loaded') {
            window.router.push('/')
            // state.ui = 'main'
          } else if (pkg.type === 'title') {
            state.title = pkg.data.text
          } else if (pkg.type === 'msg') {
            const n = new Uint8Array(1)
            window.crypto.getRandomValues(n)
            pkg.data.hash = n[0]
            state.msgs.push(pkg)
          } else if (pkg.type === 'cls') {
            if (pkg.data.num === 0) {
              state.main.children.splice(0, state.main.children.length)
            } else {
              state.main.children.splice(state.main.children.length - pkg.data.num, pkg.data.num)
            }
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
          } else if (pkg.type === 'console_output') {
            state.console.children.push(AST.newElement('output', { value: pkg.data.value }))
          } else if (pkg.type === 'generate_planet') {
            state.space.data.rawPlanetData = generatePlanet(pkg.data.area_quantity)
            state.space.data.nextIndex = 0
            const e = {
              type: 'PLANET_GENERATED',
              data: { length: state.space.data.rawPlanetData.length }
            }
            const event = new CustomEvent('send', { detail: e })
            document.dispatchEvent(event)
          } else if (pkg.type === 'get_area_data') {
            const pkg = {
              type: 'AREA_DATA',
              data: state.space.data.rawPlanetData.slice(state.space.data.nextIndex, state.space.data.nextIndex + 50)
            }
            state.space.data.nextIndex += 50
            const event = new CustomEvent('send', { detail: pkg })
            document.dispatchEvent(event)
          } else if (pkg.type === 'generate_planet') {
            const pkg = {
              type: 'MAP_GENERATED',
              data: generatePlanet()
            }
            const event = new CustomEvent('send', { detail: pkg })
            // document.dispatchEvent(event)
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
          // console.log('Final:', state)
        },
        handleEvent(state, pkg) {
          if ([
            'MOUSE_CLICK',
            'KEY_UP',
            'BUTTON_CLICK',
            'LINK_CLICK',
            'RATE_CLICK',
            'CHECK_CHANGE',
            'RADIO_CHANGE',
            'INPUT_CHANGE',
            'DROPDOWN_CHANGE',
            'CONSOLE_INPUT',
            'GET_CONFIG'
          ].indexOf(pkg.type) !== -1) {
            const event = new CustomEvent('send', { detail: pkg })
            document.dispatchEvent(event)
            if (['CONSOLE_INPUT'].indexOf(pkg.type) !== -1) {
              state.console.children.push(AST.newElement('input', { value: pkg.value }))
            }
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
  }

  getVueStore() { return this.store }
  parsePackage(pkg) { this.store.commit('parsePackage', pkg) }
}

function generateMenu() {
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
