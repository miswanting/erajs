/**
 * 地图数据生成模块
 */
const SimplexNoise = require('simplex-noise')
const { assign } = require('lodash')
const geo = require('d3-geo')
const voronoi = require('d3-geo-voronoi')
const d3 = assign(geo, voronoi)
/**
 * 接收器
 */
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
/**
 * # 生成星球
 * @param {number} n - 区块数量
 */
function generatePlanet (n) {
  /**
   * # 生成斐波那契离散点
   * @param {number} pointAmount - 数量
   * @returns {number[][]} 点坐标列表
   */
  function generatePointsUsingFibonacci (pointAmount) {
    const points = []
    const phi = 180 * (3 - Math.sqrt(5)) // 黄金分割（角度）
    for (let i = 0; i < pointAmount; i++) {
      const y = 1 - i / (pointAmount - 1) * 2
      const lat = Math.asin(y) / Math.PI * 180
      const lon = phi * i % 360
      points.push([lon, lat])
    }
    return points
  }
  /**
   * # 经纬度转三维笛卡尔坐标（半径为1）
   * @param {number} lon - 经度[-180,180]
   * @param {number} lat - 纬度[-90,90]
   * @returns {number[]} 三维笛卡尔坐标
   */
  function coordinates2XYZ (lon, lat) {
    const rlon = lon / 180 * Math.PI
    const rlat = lat / 180 * Math.PI
    const x = Math.cos(rlon) * Math.cos(rlat)
    const y = Math.sin(rlat)
    const z = Math.sin(rlon) * Math.cos(rlat)
    return [x, y, z]
  }
  /**
   * # 高度着色器
   * @param {number} height - 高度[-2000,8000]
   * @returns {number[]} RGB数值列表[0,255]
   */
  function heightShader (height) {
    let r, g, b
    if (height > 7500) { // 白
      // r = g = b = (v.height / 256 - 0.9) * 10 * 128 + 128
      r = g = b = 255
    } else if (height > 6000) { // 裸岩
      r = g = b = 50
    } else if (height > 3000) { // 森林
      [r, g, b] = [0, 112, 78]
    } else if (height > 1000) { // 草地
      [r, g, b] = [85, 146, 78]
    } else if (height > 0) { // 沙滩
      [r, g, b] = [215, 205, 164]
    } else if (height > -500) { // 浅水
      [r, g, b] = [28, 154, 216]
    } else { // 深水
      [r, g, b] = [0, 81, 182]
    }
    return [Math.floor(r), Math.floor(g), Math.floor(b)]
  }
  /**
   * # D3Geo数据转地图数据
   * @param {number} polygons d3.geoVoronoi(points).polygons()
   */
  function convertFromGeo (polygons) {
    const noise = new SimplexNoise()
    const nodes = []
    for (let i = 0; i < polygons.features.length; i++) {
      const v = {
        lon: 0, // 经度
        lat: 0, // 纬度
        neighbours: [], // 相邻序号
        height: 0, // 高度[-2000,8000]
        color: [], // 颜色[0,255]
        temp: 0, // 温度[-10,50]
        vertices: [], // 区块的顶点坐标
        faces: [] // 区块内部的面
      }
      v.lon = polygons.features[i].properties.site[0].toFixed(2)
      v.lat = polygons.features[i].properties.site[1].toFixed(2)
      v.neighbours = polygons.features[i].properties.neighbours
      const pos = coordinates2XYZ(v.lon, v.lat)
      v.height = noise.noise3D(pos[0] * 3, pos[1] * 3, pos[2] * 3)
      v.height = (v.height + 1) / 2
      v.height = v.height * v.height
      v.height = (v.height * 10000 - 2000).toFixed(0)
      v.temp = ((1 - Math.abs(v.lat) / 90) * 60 - 10).toFixed(1)
      v.color = heightShader(v.height)
      const cd = polygons.features[i].geometry.coordinates[0]
      for (let j = 0; j < cd.length; j++) {
        v.vertices.push([cd[j][0].toFixed(2), cd[j][1].toFixed(2)])
      }
      nodes.push(v)
    }
    return nodes
  }
  /**
   * # 扰动点列表坐标
   * @param {number[][]} points 点坐标列表
   * @returns {number[][]} 点坐标列表
   */
  function randomizePoints (points) {
    for (let i = 0; i < points.length; i++) {
      points[i][0] = points[i][0] + (Math.random() - 0.5) * 10
    }
    return points
  }
  /**
   * # 离散点列表坐标
   * @param {number[][]} points 点坐标列表
   * @param {number} n 离散次数
   * @returns {number[][]} 点坐标列表
   */
  function scratterPoints (points, n) {
    for (let i = 0; i < n; i++) {
      const polygons = d3.geoVoronoi(points).polygons()
      for (let j = 0; j < polygons.features.length; j++) {
        points[j] = d3.geoCentroid(polygons.features[j])
      }
    }
    return points
  }
  // 业务代码
  const AreaQuantity = 50000
  let ps = generatePointsUsingFibonacci(AreaQuantity)
  ps = randomizePoints(ps)
  ps = scratterPoints(ps, 3)
  const voronoi = d3.geoVoronoi(ps)
  const polygons = voronoi.polygons()
  const data = convertFromGeo(polygons)
  return data
}
