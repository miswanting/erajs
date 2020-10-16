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
  mounted () {
    this.generateRandomPoints(this.n)
    this.dispersePoints(this.t)
    this.renderSvg()
  },
  methods: {
    generateRandomPoints (n) {
      for (let i = 0; i < n; i++) {
        const x = Math.random() * this.$refs.map.clientWidth
        const y = Math.random() * this.$refs.map.clientHeight
        this.points.push([x, y])
      }
    },
    dispersePoints (n) {
      for (let i = 0; i < n; i++) {
        const delaunay = d3.Delaunay.from(this.points)
        const voronoi = delaunay.voronoi([0, 0, this.$refs.map.clientWidth, this.$refs.map.clientHeight])
        for (let j = 0; j < this.points.length; j++) {
          const cvt = []
          for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
            var [x, y] = voronoi.cellPolygon(j)[k]
            cvt.push([x, y])
          }
          [this.points[j][0], this.points[j][1]] = d3.polygonCentroid(cvt)
        }
      }
    },
    renderSvg () {
      const noise = new SimplexNoise()
      const delaunay = d3.Delaunay.from(this.points)
      const voronoi = delaunay.voronoi([0, 0, this.$refs.map.clientWidth, this.$refs.map.clientHeight])
      const zoom = d3.zoom().on('zoom', this.zoom)
      d3.select('.map')
        .append('svg')
        .attr('width', this.$refs.map.clientWidth)
        .attr('height', this.$refs.map.clientHeight)
        .call(zoom)
        .append('g')
        .attr('id', 'viewport')
      for (let i = 0; i < delaunay.points.length / 2; i++) {
        var x = delaunay.points[2 * i]
        var y = delaunay.points[2 * i + 1]
        var value = noise.noise2D(x * 0.003, y * 0.003)
        value = (value + 1) / 2
        value = value * value
        var r = 100; var g = 100; var b = 100
        value = parseInt((value * 256).toString())
        r = g = b = value
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
        d3.select('#viewport')
          .append('path')
          .attr('d', voronoi.renderCell(i))
          .attr('fill', `rgb(${r},${g},${b})`)
          // .on('mouseenter', function (e) {
          //   d3.select(this).attr('fill', d3.color(d3.select(this).attr('fill')).brighter())

        // })
        // .on('mouseleave', function (e) {
        //   d3.select(this).attr('fill', d3.color(d3.select(this).attr('fill')))
        // })
      }
    },
    zoom () {
      var transform = d3.zoomTransform(document.querySelector('svg'))
      d3.select('#viewport').attr('transform', transform.toString())
    }
  },
  template: '<main ref="map" class="map"></main>'
}])
