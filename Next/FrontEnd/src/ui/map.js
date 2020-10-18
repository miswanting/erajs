components.push(['i-map-manager', {
  template: '<i-header></i-header><map-main></map-main>'
}])
components.push(['map-main', {
  mounted () {
    const AreaQuantity = 50000
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
    function XYZ2Coordinates (x, y, z) { }
    function convertFromGeoJSON (polygons) { }
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
        // console.log(v.temp);
        // if (v.temp < 3) {
        //     r += -v.temp * 20
        //     g += -v.temp * 20
        //     b += -v.temp * 20
        // }
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
        const polygons = d3.geoVoronoi(points).polygons()
        for (let j = 0; j < polygons.features.length; j++) {
          points[j] = d3.geoCentroid(polygons.features[j])
        }
      }
      return points
    }
    const main = this.$refs.map
    const viewportSize = glMatrix.vec2.fromValues(
      main.clientWidth,
      window.innerHeight - document.querySelector('header').clientHeight
    )
    console.log(viewportSize)
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', viewportSize[0])
    canvas.setAttribute('height', viewportSize[1])
    main.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
    const cameraConfig = {
      fov: 75,
      aspect: viewportSize[0] / viewportSize[1],
      near: 0.01,
      far: 100
    }
    const camera = new THREE.PerspectiveCamera(
      cameraConfig.fov,
      cameraConfig.aspect,
      cameraConfig.near,
      cameraConfig.far
    )
    camera.position.z = 3

    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(0, 0, 0)
    controls.enablePan = false
    controls.minDistance = 1.01
    controls.mouseButtons.LEFT = null
    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE

    const scene = new THREE.Scene()

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(10, 0, 0)
    light.target.position.set(0, 0, 0)
    scene.add(light)
    scene.add(light.target)
    const aLight = new THREE.AmbientLight(0x151520)
    scene.add(aLight)

    // papare data
    let ps = generatePointsUsingFibonacci(AreaQuantity)
    ps = randomizePoints(ps)
    ps = scratterPoints(ps, 3)

    // papare data
    const voronoi = d3.geoVoronoi(ps)
    const polygons = voronoi.polygons()
    const data = convertFromGeo(polygons)
    let cIndex = 0

    const planet = new THREE.Geometry()
    for (let i = 0; i < data.length; i++) {
      let pos = coordinates2XYZ(data[i].lon, data[i].lat)
      cIndex = planet.vertices.length
      planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]))
      for (let j = 0; j < data[i].children.length; j++) {
        pos = coordinates2XYZ(data[i].children[j][0], data[i].children[j][1])
        planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]))
        if (j >= 1) {
          const color = new THREE.Color(data[i].color)
          var face = new THREE.Face3(
            cIndex,
            planet.vertices.length - 2,
            planet.vertices.length - 1,
            null,
            color
          )
          data[i].childrenIndex.push(planet.faces.length)
          planet.faces.push(face)
        }
      }
    }
    planet.computeFaceNormals()
    planet.computeVertexNormals()
    const planetMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      vertexColors: THREE.FaceColors,
      shininess: 40
    })
    scene.add(new THREE.Mesh(planet, planetMaterial))

    const stars = new THREE.Geometry()
    for (var i = 0; i < 100; i++) {
      const p = new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100)
      stars.vertices.push(p)
    }
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1
    })
    scene.add(new THREE.Points(stars, starMaterial))

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function onMouseMove (e) {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      mouse.x = (e.clientX / viewportSize[0]) * 2 - 1
      mouse.y = -(e.clientY / viewportSize[1]) * 2 + 1
      console.log(e.clientX, e.clientY)
    }
    canvas.addEventListener('mousemove', onMouseMove)
    let needResize = false
    addEventListener('resize', () => { needResize = true })

    function render () {
      if (needResize) {
        glMatrix.vec2.set(
          viewportSize,
          main.clientWidth,
          window.innerHeight - document.querySelector('header').clientHeight
        )
        canvas.setAttribute('width', viewportSize[0])
        canvas.setAttribute('height', viewportSize[1])
        camera.aspect = viewportSize[0] / viewportSize[1]
        camera.updateProjectionMatrix()
        renderer.setSize(viewportSize[0], viewportSize[1], false)
      }
      // raycaster.setFromCamera(mouse, camera)
      // // 计算物体和射线的焦点
      // const intersects = raycaster.intersectObjects(scene.children)
      // if (intersects.length) {
      //   for (let i = 0; i < data.length; i++) {
      //     // console.log(intersects);
      //     if (data[i].childrenIndex.indexOf(intersects[0].faceIndex) !== -1) {
      //       for (let j = 0; j < data[i].childrenIndex.length; j++) {
      //         scene.children[3].geometry.faces[data[i].childrenIndex[j]].color.setRGB(255, 255, 255)
      //         planet.colorsNeedUpdate = true
      //       }
      //     }
      //   }
      // }
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  },
  template: '<main ref="map" class="map"></main>'
}])
