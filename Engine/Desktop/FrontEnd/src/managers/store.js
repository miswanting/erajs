import { EventEmitter } from 'events'
import { createStore } from 'vuex'
import { AST } from './ast'
import MapWorkerManager from './map'
let toMain
export class StoreManager extends EventEmitter {
  constructor (net) {
    super()
    toMain = net
    this.store = createStore({
      state () {
        return {
          style: {},
          title: { type: 'title', data: { text: 'Era.js' }, style: null },
          footer: { type: 'footer', data: { text: '@Miswanting' }, style: null },
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
          // map: AST.newElement('map'),
          space: AST.newElement('space'),
          mapGenerated: false
        }
      },
      mutations: {
        parsePackage (state, pkg) {
          if (pkg.type === 'set_loading_title') {
            state.loadTitle = pkg.data.value
          } else if (pkg.type === 'set_loading_text') {
            state.loadText = pkg.data.value
          } else if (pkg.type === 'title') {
            state.title = pkg
          } else if (pkg.type === 'msg') {
            state.msgs.push(pkg)
          } else if (pkg.type === 'cls') {
            if (pkg.data.num === 0) {
              state.main.children.splice(0, state.main.children.length)
            } else {
              state.main.children.splice(state.main.children.length - pkg.data.num, pkg.data.num)
            }
          } else if (pkg.type === 'footer') {
            state.footer = pkg
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
            'divider',
            'img-inline',
            'img-block'
          ].indexOf(pkg.type) !== -1) {
            AST.push(state, pkg)
          }
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
            'DROPDOWN_CHANGE',
            'CONSOLE_INPUT',
            'GET_CONFIG'
          ].indexOf(pkg.type) !== -1) {
            toMain.send(pkg)
            // const event = new CustomEvent('send', { detail: pkg })
            // document.dispatchEvent(event)
            if (['CONSOLE_INPUT'].indexOf(pkg.type) !== -1) {
              state.console.children.push(AST.newElement('input', { value: pkg.value }))
            }
          } else if (pkg.type === 'MSG_TIMEOUT') {
            state.msgs = state.msgs.filter(x => x.data.hash !== pkg.hash)
          } else if (pkg.type === 'PLANET_GENERATED') {
            state.mapGenerated = true
          }
        }
      },
      actions: {
        parsePackage ({ commit }, pkg) {
          // console.log('Parse:', pkg)
          if (pkg.type === 'connection') {
            window.router.push('/idle')
          } else if (pkg.type === 'loaded') {
            window.router.push('/')
          } else if (pkg.type === 'generate_planet') {
            const mw = new MapWorkerManager()
            window.cache = { map: {} }
            mw.generate(pkg.data)
            mw.on('PLANET_GENERATED', pkg => {
              commit('handleEvent', {
                type: 'PLANET_GENERATED'
              })
              window.cache.map.raw = pkg.data.data
              window.cache.map.data = {}
              toMain.send(pkg)
            })
          } else if (pkg.type === 'update_map_id') {
            window.cache.map.raw.forEach((x, i) => {
              const newNeighbours = []
              x.neighbours.forEach(n => {
                newNeighbours.push(pkg.data.reflex[n])
              })
              x.neighbours = newNeighbours
              window.cache.map.data[pkg.data.reflex[i]] = x
            })
            delete window.cache.map.raw
          } else {
            commit('parsePackage', pkg)
          }
        }
      }
    })
  }

  getVueStore () { return this.store }
  parsePackage (pkg) { this.store.dispatch('parsePackage', pkg) }
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
          if (window.router.currentRoute.value.path === '/mod') {
            window.router.back()
          } else {
            window.router.push('/mod')
          }
        }
      }, {
        label: '地图管理器',
        click: () => {
          if (window.router.currentRoute.value.path === '/map') {
            window.router.back()
          } else {
            window.router.push('/map')
          }
        }
      }
    ]
  },
  { label: '帮助' },
  { label: '+' }]
}
