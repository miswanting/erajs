const SimplexNoise = require('simplex-noise')
const { assign } = require('lodash')
const geo = require('d3-geo')
const voronoi = require('d3-geo-voronoi')
const d3 = assign(geo, voronoi)
// const { geoCentroid }
// const { geoVoronoi } = require('d3-geo-voronoi')
onmessage = function (pkg) {
  pkg = pkg.data
  if (pkg.type === 'generate') {
    const ans = generatePlanet(pkg.data.area_quantity)
    postMessage({
      type: 'PLANET_GENERATED',
      data: { data: ans }
    })
  }
}
function generatePlanet(n) {
  function generatePointsUsingFibonacci(pointAmount) {
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
  function coordinates2XYZ(lon, lat) {
    const rlon = lon / 180 * Math.PI
    const rlat = lat / 180 * Math.PI
    const x = Math.cos(rlon) * Math.cos(rlat)
    const y = Math.sin(rlat)
    const z = Math.sin(rlon) * Math.cos(rlat)
    return [x, y, z]
  }
  function convertFromGeo(polygons) {
    const noise = new SimplexNoise()
    const data = []
    for (let i = 0; i < polygons.features.length; i++) {
      const v = {
        lon: 0, // 经度
        lat: 0, // 纬度
        neighbours: 0, // 相邻节点
        childrenIndex: 0, // 点索引
        height: 0, // 高度[-2000,8000]
        temp: 0 // 温度[-10,30]
      }
      v.lon = polygons.features[i].properties.site[0].toFixed(2)
      v.lat = polygons.features[i].properties.site[1].toFixed(2)
      v.neighbours = polygons.features[i].properties.neighbours
      v.childrenIndex = []
      const tmp = coordinates2XYZ(v.lon, v.lat)
      v.height = noise.noise3D(tmp[0] * 3, tmp[1] * 3, tmp[2] * 3)
      // v.height = noise.noise2D(v.lon * 0.03, v.lat * 0.03)
      v.height = (v.height + 1) / 2
      v.height = v.height * v.height
      v.height = (v.height * 10000 - 2000).toFixed(0)
      v.temp = ((1 - Math.abs(v.lat) / 90) * 40 - 10).toFixed(1)
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
        v.children.push([cd[j][0].toFixed(2), cd[j][1].toFixed(2)])
      }
      data.push(v)
    }
    return data
  }
  function randomizePoints(points) {
    for (let i = 0; i < points.length; i++) {
      points[i][0] = points[i][0] + (Math.random() - 0.5) * 10
      // points[i][1] = points[i][1] + (Math.random() - 0.5) * 10
    }
    return points
  }
  function scratterPoints(points, n) {
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