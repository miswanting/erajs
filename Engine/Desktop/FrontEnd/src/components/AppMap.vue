<template lang="pug">
AppHeader
main.map(ref="map")
</template>
<script>
import { vec2 } from "gl-matrix";
import THREE from "three";
import AppHeader from "./AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  mounted() {
    if (!window.mapCache) {
    } else {
      const main = this.$refs.map;
      const viewportSize = vec2.fromValues(
        main.clientWidth,
        window.innerHeight - document.querySelector("header").clientHeight
      );
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", viewportSize[0]);
      canvas.setAttribute("height", viewportSize[1]);
      main.appendChild(canvas);

      console.log(THREE);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
      const cameraConfig = {
        fov: 75,
        aspect: viewportSize[0] / viewportSize[1],
        near: 0.01,
        far: 100,
      };
      const camera = new THREE.PerspectiveCamera(
        cameraConfig.fov,
        cameraConfig.aspect,
        cameraConfig.near,
        cameraConfig.far
      );
      camera.position.z = 3;

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target = new THREE.Vector3(0, 0, 0);
      controls.enablePan = false;
      controls.minDistance = 1.01;
      controls.mouseButtons.LEFT = null;
      controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;

      const scene = new THREE.Scene();

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(10, 0, 0);
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);
      const aLight = new THREE.AmbientLight(0x151520);
      scene.add(aLight);

      // papare data
      let ps = generatePointsUsingFibonacci(AreaQuantity);
      ps = randomizePoints(ps);
      ps = scratterPoints(ps, 3);

      // papare data
      const voronoi = d3.geoVoronoi(ps);
      const polygons = voronoi.polygons();
      const data = convertFromGeo(polygons);
      let cIndex = 0;

      const planet = new THREE.Geometry();
      for (let i = 0; i < data.length; i++) {
        let pos = coordinates2XYZ(data[i].lon, data[i].lat);
        cIndex = planet.vertices.length;
        planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
        for (let j = 0; j < data[i].children.length; j++) {
          pos = coordinates2XYZ(data[i].children[j][0], data[i].children[j][1]);
          planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
          if (j >= 1) {
            const color = new THREE.Color(data[i].color);
            var face = new THREE.Face3(
              cIndex,
              planet.vertices.length - 2,
              planet.vertices.length - 1,
              null,
              color
            );
            data[i].childrenIndex.push(planet.faces.length);
            planet.faces.push(face);
          }
        }
      }
      planet.computeFaceNormals();
      planet.computeVertexNormals();
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
        shininess: 40,
      });
      scene.add(new THREE.Mesh(planet, planetMaterial));

      const stars = new THREE.Geometry();
      for (var i = 0; i < 100; i++) {
        const p = new THREE.Vector3(
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        );
        stars.vertices.push(p);
      }
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
      });
      scene.add(new THREE.Points(stars, starMaterial));

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      function onMouseMove(e) {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        mouse.x = (e.clientX / viewportSize[0]) * 2 - 1;
        mouse.y = -(e.clientY / viewportSize[1]) * 2 + 1;
        console.log(e.clientX, e.clientY);
      }
      canvas.addEventListener("mousemove", onMouseMove);
      let needResize = false;
      addEventListener("resize", () => {
        needResize = true;
      });

      function render() {
        if (needResize) {
          glMatrix.vec2.set(
            viewportSize,
            main.clientWidth,
            window.innerHeight - document.querySelector("header").clientHeight
          );
          canvas.setAttribute("width", viewportSize[0]);
          canvas.setAttribute("height", viewportSize[1]);
          camera.aspect = viewportSize[0] / viewportSize[1];
          camera.updateProjectionMatrix();
          renderer.setSize(viewportSize[0], viewportSize[1], false);
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
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
  },
};
</script>
<style lang="stylus" scoped></style>