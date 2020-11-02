const { json } = require('d3')

components.push(['i-map-manager', {
  template: '<i-header></i-header><map-main></map-main>'
}])
components.push(['map-main', {
  data () {
    return {
      n: 5000,
      t: 5,
      points: []

    }
  },
  methods: {},
  mounted () {
    const canvas = d3.select('main') // 选择main
      .append('canvas') // 添加canvas
      .attr('width', this.$refs.map.clientWidth) // 宽度与main一致
      .attr('height', this.$refs.map.clientHeight) // 高度与main一致
    const context = canvas.node().getContext('2d') // 抓取canvas的context
    const sphere = { type: 'Sphere' } // 作为基底的球
    // const projection = d3.geoEquirectangular() // 等量矩形投影（生成平面）
    const projection = d3.geoOrthographic() // 正交投影（生成球面）
      .translate([this.$refs.map.clientWidth / 2, this.$refs.map.clientHeight / 2]) // 正交投影时移动球心到canvas中心
    const path = d3.geoPath(projection, context).pointRadius(1) // 设置当前投影下的3D->2D的映射转换器
    const graticule = d3.geoGraticule10() // 10°经纬球的快捷对象
    // let v = d3.geoVoronoi([[0, 0], [100, 0], [0, 100]])
    const points = d3.range(10000).map(function () {
      return [360 * Math.random(), 90 * (Math.random() - Math.random())]
    })
    // 分散
    for (let i = 0; i < 2; i++) {
      const polygons = d3.geoVoronoi(points).polygons()
      for (let j = 0; j < points.length; j++) {
        points[j] = d3.geoCentroid(polygons.features[j])
      }
    }
    const noise = new SimplexNoise()
    const hs = []
    for (let i = 0; i < points.length; i++) {
    }
    const voronoi = d3.geoVoronoi(points)
    const polygons = voronoi.polygons()
    for (let i = 0; i < voronoi.polygons().features.length; i++) {
      voronoi.polygons().features[i].geometry.style = { fill: 'red' }
    }
    console.log(polygons)

    const render = () => { // 渲染函数
      context.clearRect(0, 0, this.$refs.map.clientWidth, this.$refs.map.clientHeight) // 清屏
      context.beginPath()
      path(sphere)
      context.fillStyle = '#fff'
      context.fill() // 画球
      // context.beginPath(), path(graticule), context.fillStyle = '#fff', context.fill() // 画经纬球的面
      // context.beginPath(), path(graticule), context.strokeStyle = '#333639', context.stroke() // 画经纬球的线
      // context.beginPath();
      // path({ type: "MultiPoint", coordinates: points });
      // context.fillStyle = "#f00";
      // context.fill();

      // context.beginPath()
      // path(polygons)
      // context.fillStyle = `rgb(${r},${g},${b})`
      // context.fill()

      for (let i = 0; i < points.length; i++) {
        context.beginPath()
        path(voronoi.polygons().features[i])
        let value = noise.noise2D(points[i][0] * 0.03, points[i][1] * 0.03)
        value = (value + 1) / 2
        value = value * value
        value = parseInt((value * 256).toString())
        let r
        let g
        let b
        if (value / 256 > 0.9) { // 白
          r = g = b = (value / 256 - 0.9) * 10 * 128 + 128
        } else if (value / 256 > 0.8) { // 灰
          r = g = b = 50
        } else if (value / 256 > 0.6) { // 深绿
          r = 27, g = 122, b = 34
        } else if (value / 256 > 0.4) { // 浅绿
          r = 31, g = 192, b = 42
        } else if (value / 256 > 0.2) { // 黄
          r = 243, g = 245, b = 65
        } else if (value / 256 > 0.1) { // 浅蓝
          r = 60, g = 81, b = 195
        } else { // 深蓝
          r = 25, g = 35, b = 93
        }
        context.fillStyle = `rgb(${r},${g},${b})`
        context.fill()
      }

      // context.beginPath()
      // path(voronoi.polygons())
      // context.fillStyle = '#ff0'
      // context.fill()

      // context.beginPath()
      // path({ type: 'MultiPoint', coordinates: points })
      // context.fillStyle = '#070'
      // context.fill()

      // for (let i = 0; i < voronoi.delaunay.polygons.length; i++) {
      //   let value = noise.noise2D(points[0] * 0.003, points[1] * 0.003)
      //   value = (value + 1) / 2
      //   value = value * value
      //   value = parseInt((value * 256).toString())
      //   const r = value
      //   const g = value
      //   const b = value
      // }
    }
    const drag = (projection) => { // 拖动
      let v0, q0, r0, a0, l

      const pointer = (event, target) => {
        // const t = d3.pointers(event, that)
        const t = d3.pointer(event, target)

        if (t.length !== l) {
          l = t.length
          if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
          dragstarted.apply(target, [event, target])
        }

        // 多点触摸, 平均位置 并计算旋转.
        // if (l > 1) {
        //   const x = d3.mean(t, p => p[0])
        //   const y = d3.mean(t, p => p[1])
        //   const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
        //   return [x, y, a]
        // }

        return d3.pointer(event, target)
      }

      const dragstarted = (event) => {
        v0 = versor.cartesian(projection.invert(pointer(event, this)))
        q0 = versor(r0 = projection.rotate())
      }

      const dragged = (event) => {
        const p = pointer(event, this)
        const v1 = versor.cartesian(projection.rotate(r0).invert(p))
        const delta = versor.delta(v0, v1)
        const q1 = versor.multiply(q0, delta)

        // For multitouch, compose with a rotation around the axis.
        // if (p[2]) {
        //   const d = (p[2] - a0) / 2
        //   const s = -Math.sin(d)
        //   const c = Math.sign(Math.cos(d))
        //   q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1)
        // }

        projection.rotate(versor.rotation(q1))

        // In vicinity of the antipode (unstable) of q0, restart.
        if (delta[0] < 0.7) dragstarted.apply(this, [event, this])
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
    }
    const zoom = (projection) => { // 缩放
      // const scale = projection._scale === undefined
      //   ? (projection._scale = projection.scale())
      //   : projection._scale
      const scale = projection.scale()
      const scaleExtent = [0.8, 8]
      let v0, q0, r0, a0, tl

      const zoomstarted = (event) => {
        v0 = versor.cartesian(projection.invert(point(event, this)))
        q0 = versor((r0 = projection.rotate()))
      }

      const zoomed = (event) => {
        projection.scale(event.transform.k)
        const pt = point(event, this)
        const v1 = versor.cartesian(projection.rotate(r0).invert(pt))
        const delta = versor.delta(v0, v1)
        const q1 = versor.multiply(q0, delta)

        // For multitouch, compose with a rotation around the axis.
        // if (pt[2]) {
        //   const d = (pt[2] - a0) / 2
        //   const s = -Math.sin(d)
        //   const c = Math.sign(Math.cos(d))
        //   q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1)
        // }

        projection.rotate(versor.rotation(q1))

        // In vicinity of the antipode (unstable) of q0, restart.
        if (delta[0] < 0.7) zoomstarted.call(this, event)
      }
      const zoom = d3.zoom()
        .scaleExtent(scaleExtent.map(x => x * scale))
        .on('start', zoomstarted)
        .on('zoom', zoomed)

      const point = (event, that) => {
        const t = d3.pointers(event, that)

        if (t.length !== tl) {
          tl = t.length
          if (tl > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
          zoomstarted.call(that, event)
        }

        return tl > 1
          ? [
            d3.mean(t, p => p[0]),
            d3.mean(t, p => p[1]),
            Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0])
          ]
          : t[0]
      }

      return Object.assign(selection => selection
        .property('__zoom', d3.zoomIdentity.scale(projection.scale()))
        .call(zoom), {
        on (type, ...options) {
          return options.length
            ? (zoom.on(type, ...options), this)
            : zoom.on(type)
        }
      })
    }
    // render()
    d3.select(context.canvas)
      .call(zoom(projection)
        .on('zoom.render', () => render())
        .on('end.render', () => render()))
      .call(drag(projection)
        .on('drag.render', () => render())
        .on('end.render', () => render()))
      .call(() => render())
  },
  template: '<main ref="map" class="map"></main>'
}])