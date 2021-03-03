<template lang="pug">
AppHeader
main.map
  .canvas(v-if="$store.state.mapGenerated", ref="map")
  .fail-info(v-else) 尚未生成
</template>
<script>
import { vec2 } from "gl-matrix";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AppHeader from "./AppHeader.vue";
export default {
  components: { AppHeader },
  mounted() {
    if (this.$store.state.mapGenerated) {
      const main = this.$refs.map;
      const viewportSize = vec2.fromValues(
        main.clientWidth,
        window.innerHeight - document.querySelector("header").clientHeight
      );
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", viewportSize[0]);
      canvas.setAttribute("height", viewportSize[1]);
      main.appendChild(canvas);

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

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target = new THREE.Vector3(0, 0, 0);
      controls.enablePan = false;
      controls.minDistance = 1.01;
      controls.rotateSpeed = 1;
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
      // let ps = generatePointsUsingFibonacci(AreaQuantity);
      // ps = randomizePoints(ps);
      // ps = scratterPoints(ps, 3);

      // papare data
      // const voronoi = d3.geoVoronoi(ps);
      // const polygons = voronoi.polygons();
      // const data = convertFromGeo(polygons);
      const data = window.cache.map.data;
      let cIndex = 0;

      function coordinates2XYZ(lon, lat) {
        const rlon = (lon / 180) * Math.PI;
        const rlat = (lat / 180) * Math.PI;
        const x = Math.cos(rlon) * Math.cos(rlat);
        const y = Math.sin(rlat);
        const z = Math.sin(rlon) * Math.cos(rlat);
        return [x, y, z];
      }

      // WIP
      // const helpers = [];
      // const PH = [];

      const planet = new THREE.BufferGeometry();

      const indices = []; // 顶点复用索引列表[f0p0i,f0p1i,f0p2i,f1p0i...]

      const positions = []; // 顶点坐标列表[x0,y0,z0,x1...]
      const normals = [];
      const colors = [];

      const color = new THREE.Color();

      const pA = new THREE.Vector3();
      const pB = new THREE.Vector3();
      const pC = new THREE.Vector3();

      const cb = new THREE.Vector3();
      const ab = new THREE.Vector3();

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const node = data[key];
          color.setRGB(node.color[0], node.color[1], node.color[2]);
          let pos = coordinates2XYZ(node.lon, node.lat);
          let cpi = positions.length / 3; // Center Point Index
          // pA.set(pos[0], pos[1], pos[2]);
          let normal = new THREE.Vector3(pos[0], pos[1], pos[2]);
          normal.normalize();
          normals.push(normal.x, normal.y, normal.z);
          positions.push(pos[0], pos[1], pos[2]);
          // PH.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
          colors.push(color.r, color.g, color.b);
          // console.log(0, node.vertices.length);
          // console.log(0, positions.length, colors.length, color);
          for (let j = 0; j < node.vertices.length; j++) {
            let pos = coordinates2XYZ(node.vertices[j][0], node.vertices[j][1]);
            positions.push(pos[0], pos[1], pos[2]);
            // PH.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
            colors.push(color.r, color.g, color.b);
            // console.log(1, positions.length, colors.length, color);

            let normal = new THREE.Vector3(pos[0], pos[1], pos[2]);
            normal.normalize();
            normals.push(normal.x, normal.y, normal.z);
            if (j > 0) {
              indices.push(
                cpi,
                positions.length / 3 - 2,
                positions.length / 3 - 1
              );
              // pB.set(
              //   positions[positions.length - 6],
              //   positions[positions.length - 5],
              //   positions[positions.length - 4]
              // );
              // pC.set(
              //   positions[positions.length - 3],
              //   positions[positions.length - 2],
              //   positions[positions.length - 1]
              // );

              // cb.subVectors(pC, pB);
              // ab.subVectors(pA, pB);
              // cb.cross(ab);

              // cb.normalize();

              // normals.push(cb.x, cb.y, cb.z);
              // normals.push(cb.x, cb.y, cb.z);
              // normals.push(cb.x, cb.y, cb.z);
            }
          }
          indices.push(cpi, positions.length / 3 - 1, cpi + 1);
        }
        // console.log(planet);
        // break;
      }

      planet.setIndex(indices);
      planet.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      planet.setAttribute(
        "normal",
        new THREE.Float32BufferAttribute(normals, 3)
      );
      planet.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      // function disposeArray() {
      //   this.array = null;
      // }
      // planet.setAttribute(
      //   "position",
      //   new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray)
      // );
      // planet.setAttribute(
      //   "normal",
      //   new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray)
      // );
      // planet.setAttribute(
      //   "color",
      //   new THREE.Float32BufferAttribute(colors, 3).onUpload(disposeArray)
      // );
      // planet.computeBoundingSphere();
      // WIP
      // const planet = new THREE.BufferGeometry();
      // for (const key in data) {
      //   if (Object.hasOwnProperty.call(data, key)) {
      //     const node = data[key];
      //     let pos = coordinates2XYZ(node.lon, node.lat);
      //     cIndex = planet.vertices.length;
      //     planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
      //     for (let j = 0; j < node.vertices.length; j++) {
      //       pos = coordinates2XYZ(node.vertices[j][0], node.vertices[j][1]);
      //       planet.vertices.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
      //       if (j >= 1) {
      //         const color = new THREE.Color(`rgb(${node.color.join(",")})`);
      //         var face = new THREE.Face3(
      //           cIndex,
      //           planet.vertices.length - 2,
      //           planet.vertices.length - 1,
      //           null,
      //           color
      //         );
      //         node;
      //         node.faces.push(planet.faces.length);
      //         planet.faces.push(face);
      //       }
      //     }
      //   }
      // }

      // planet.computeFaceNormals();
      // planet.computeVertexNormals();
      // WIP
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
        shininess: 40,
      });
      scene.add(new THREE.Mesh(planet, planetMaterial));
      // XXX
      // scene.add(new THREE.LineLoop(helpers));
      // XXX
      const stars = new THREE.BufferGeometry();
      positions.splice(0, positions.length);
      for (var i = 0; i < 100; i++) {
        positions.push(
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        );
        // const p = new THREE.Vector3(
        //   Math.random() * 200 - 100,
        //   Math.random() * 200 - 100,
        //   Math.random() * 200 - 100
        // );
        // stars.vertices.push(p);
      }
      stars.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
      });
      scene.add(new THREE.Points(stars, starMaterial));

      // LH
      // const lineMaterial = new THREE.LineBasicMaterial({
      //   color: 0xffffff,
      //   linewidth: 1,
      // });
      // const lines = new THREE.BufferGeometry().setFromPoints(PH);
      // scene.add(new THREE.Line(lines, lineMaterial));
      // LH
      // for (let i = 0; i < helpers.length; i++) {
      //   helpers[i].normalize();
      //   const arrowHelper = new THREE.ArrowHelper(
      //     -helpers[i],
      //     new THREE.Vector3(0, 0, 0),
      //     1,
      //     0xffff00
      //   );
      //   scene.add(arrowHelper);
      // }

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      function onMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        mouse.x = ((e.clientX - rect.left) / viewportSize[0]) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / viewportSize[1]) * 2 + 1;
        // console.log(e.clientX - rect.left, e.clientY - rect.top);
      }
      canvas.addEventListener("mousemove", onMouseMove);
      let needResize = false;
      addEventListener("resize", () => {
        needResize = true;
      });

      function render() {
        if (needResize) {
          vec2.set(
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
        raycaster.setFromCamera(mouse, camera);
        // 计算物体和射线的焦点
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length) {
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const node = data[key];
              if (node.faces.indexOf(intersects[0].faceIndex) !== -1) {
                for (let j = 0; j < node.faces.length; j++) {
                  // console.log(scene.children[3].geometry.faces[node.faces[j]].color);
                  scene.children[3].geometry.faces[node.faces[j]].color.setRGB(
                    255,
                    255,
                    255
                  );
                  planet.colorsNeedUpdate = true;
                }
              }
            }
          }
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
  },
};
</script>
<style lang="stylus" scoped></style>