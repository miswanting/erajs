const { running } = require('animejs')

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
      { label: '+' }],
      console: AST.newElement('console'),
      pause: AST.newElement('pause'),
      main: AST.newElement('main'),
      intro: AST.newElement('intro'),
      map: AST.newElement('map'),
      space: AST.newElement('space')
    }
  },
  mutations: {
    changeUI () { },
    appendComponent () { },
    parsePackage (state, pkg) {
      // console.log('Parse:', pkg)
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
          state.blockMode.column = pkg.data.col
          state.blockMode.alignment = pkg.data.align
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

function generatePlanet (n) {
  function generatePointsUsingFibonacci (pointAmount) {
    const points = []
    const phi = 180 * (3 - Math.sqrt(5))
    for (let i = 0; i < pointAmount; i++) {
      const y = 1 - i / (pointAmount - 1) * 2
      const lat = Math.asin(y) / Math.PI * 180
      const lon = phi * i % 360
      points.push([lon, lat])
    }
    return points
  }
  function coordinates2XYZ (lon, lat) {
    const rlon = lon / 180 * Math.PI
    const rlat = lat / 180 * Math.PI
    const x = Math.cos(rlon) * Math.cos(rlat)
    const y = Math.sin(rlat)
    const z = Math.sin(rlon) * Math.cos(rlat)
    return [x, y, z]
  }
  function convertFromGeo (polygons) {
    const noise = new SimplexNoise()
    const data = []
    for (let i = 0; i < polygons.features.length; i++) {
      const v = new Map([
        ['lon', 0], // 经度
        ['lat', 0], // 纬度
        ['neighbours', []], // 相邻节点
        ['childrenIndex', []], // 点索引
        ['height', 0], // 高度[-2000,8000]
        ['temp', 0] // 温度[-10,30]
      ])
      v.lon = polygons.features[i].properties.site[0]
      v.lat = polygons.features[i].properties.site[1]
      v.neighbours = polygons.features[i].properties.neighbours
      v.childrenIndex = []
      const tmp = coordinates2XYZ(v.lon, v.lat)
      v.height = noise.noise3D(tmp[0] * 3, tmp[1] * 3, tmp[2] * 3)
      // v.height = noise.noise2D(v.lon * 0.03, v.lat * 0.03)
      v.height = (v.height + 1) / 2
      v.height = v.height * v.height
      v.height = v.height * 10000 - 2000
      v.temp = (1 - Math.abs(v.lat) / 90) * 40 - 10
      let r, g, b
      if (v.height / 8000 > 0.9) { // 白
        // r = g = b = (v.height / 256 - 0.9) * 10 * 128 + 128
        r = g = b = 255
      } else if (v.height > 6000) { // 裸岩
        r = g = b = 50
      } else if (v.height > 3000) { // 森林
        r = 0, g = 112, b = 78
      } else if (v.height > 1000) { // 草地
        r = 85, g = 146, b = 78
      } else if (v.height > 0) { // 沙滩
        r = 215, g = 205, b = 164
      } else if (v.height > -500) { // 浅水
        r = 28, g = 154, b = 216
      } else { // 深水
        r = 0, g = 81, b = 182
      }
      v.color = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`
      v.children = []
      const cd = polygons.features[i].geometry.coordinates[0]
      for (let j = 0; j < cd.length; j++) {
        v.children.push([cd[j][0], cd[j][1]])
      }
      data.push(v)
    }
    return data
  }
  function randomizePoints (points) {
    for (let i = 0; i < points.length; i++) {
      points[i][0] = points[i][0] + (Math.random() - 0.5) * 10
      // points[i][1] = points[i][1] + (Math.random() - 0.5) * 10
    }
    return points
  }
  function scratterPoints (points, n) {
    for (let i = 0; i < n; i++) {
      const t1 = performance.now()
      const polygons = d3.geoVoronoi(points).polygons()
      for (let j = 0; j < polygons.features.length; j++) {
        points[j] = d3.geoCentroid(polygons.features[j])
      }
    }
    return points
  }
  const AreaQuantity = 50000
  let ps = generatePointsUsingFibonacci(AreaQuantity)
  ps = randomizePoints(ps)
  ps = scratterPoints(ps, 3)
  const voronoi = d3.geoVoronoi(ps)
  const polygons = voronoi.polygons()
  const data = convertFromGeo(polygons)
  return data
}
