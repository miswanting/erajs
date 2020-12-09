<template lang="pug">
canvas.splash-canvas
</template>
<script>
import { glMatrix, vec2 } from "gl-matrix";
export default {
  mounted() {
    const particalCount = 400;
    const vanishRadius = 120;
    const particalData = new Map();
    glMatrix.setMatrixArrayType(Array);
    const main = document.querySelector("main");
    let viewportSize = vec2.fromValues(main.clientWidth, main.clientHeight);
    let screenCenter = vec2.scale([], viewportSize, 0.5);
    let ScreenRadius = vec2.length(screenCenter);
    const canvas = document.querySelector("canvas");
    canvas.setAttribute("width", viewportSize[0]);
    canvas.setAttribute("height", viewportSize[1]);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#333639";
    ctx.fillRect(0, 0, viewportSize[0], viewportSize[1]);
    function getRandomColor() {
      let color = "";
      if (Math.random() > 0.1) {
        color = "#999";
      } else if (Math.random() > 0.1) {
        color = "#900";
      } else if (Math.random() > 0.1) {
        color = "#099";
      } else {
        color = "#990";
      }
      return color;
    }
    function newPartical() {
      if (Math.random() > 0.5) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const birthAngle = Math.random() * Math.PI * 2;
        const p = {
          p: vec2.fromValues(
            screenCenter[0] + Math.cos(birthAngle) * ScreenRadius,
            screenCenter[1] + Math.sin(birthAngle) * ScreenRadius
          ),
          s: vec2.random([]),
          a: vec2.random([]),
          r: Math.random() * 1.5 + 0.5,
          c: getRandomColor(),
        };
        particalData.set(array[0], p);
      }
    }
    function drive(p) {
      const targetSpeed = 1;
      const sd = vec2.normalize([], p.s);
      const speed = vec2.length(p.s);
      const td = vec2.normalize([], vec2.subtract([], screenCenter, p.p));
      const distance = vec2.length(vec2.subtract([], screenCenter, p.p));
      const will = 1 - (distance - vanishRadius) / ScreenRadius;
      const newA = vec2.create();
      if (Math.random() > 1.6 - will) {
        vec2.add(
          newA,
          newA,
          vec2.scale(
            [],
            vec2.rotate([], sd, [0, 0], Math.PI / 2),
            vec2.cross([], sd, td)[2] / 4
          )
        );
      } else {
        vec2.add(
          newA,
          newA,
          vec2.scale(
            [],
            vec2.rotate([], sd, [0, 0], Math.PI / 2),
            (Math.random() - 0.5) / 1.5
          )
        );
      }
      vec2.add(newA, newA, vec2.scale([], sd, (targetSpeed - speed) / 10));
      p.a = newA;
      vec2.add(p.s, p.s, p.a);
      vec2.add(p.p, p.p, p.s);
      return p;
    }
    window.addEventListener("resize", () => {
      viewportSize = vec2.fromValues(main.clientWidth, main.clientHeight);
      canvas.setAttribute("width", viewportSize[0]);
      canvas.setAttribute("height", viewportSize[1]);
      screenCenter = vec2.scale([], viewportSize, 0.5);
      ScreenRadius = vec2.length(screenCenter);
    });
    function render() {
      ctx.beginPath();
      ctx.fillStyle = "#33363925";
      ctx.fillRect(0, 0, viewportSize[0], viewportSize[1]);
      for (let i = 0; i < particalCount - particalData.size; i++) {
        newPartical();
      }
      particalData.forEach((v, k) => {
        if (
          vec2.length(vec2.subtract([], screenCenter, v.p)) < vanishRadius ||
          vec2.length(vec2.subtract([], screenCenter, v.p)) >
            ScreenRadius + vanishRadius
        ) {
          particalData.delete(k);
        }
        v = drive(v);
        ctx.beginPath();
        ctx.fillStyle = v.c;
        ctx.arc(v.p[0], v.p[1], v.r, 0, 2 * Math.PI);
        ctx.fill();
      });
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  },
};
</script>
<style lang="stylus" scoped>
.splash-canvas
  position absolute
  z-index -1
</style>