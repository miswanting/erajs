<template lang="pug">
svg.app-logo(width="120", height="120")
  g#app-icon
    circle#eye-white(r="50", fill="#fff")
    circle#steering-wheel(r="40", fill="#000")
    circle#wheel-white(r="30", fill="#fff")
    line#rod(
      x1="0",
      y1="-35",
      x2="0",
      y2="35",
      stroke="#000",
      stroke-width="10"
    )
    circle#eye-black(r="20", fill="#000")
    circle#pupil(r="10", fill="#f00")
</template>
<script>
import anime from "animejs";
export default {
  data() {
    return { eyeMoveRate: { value: 0.0 } };
  },
  methods: {
    updateLogo(e) {
      e.preventDefault();
      const w = 20;
      const h = 20; // 眼动参数
      const ix = e.clientX / window.innerWidth;
      const iy = e.clientY / window.innerHeight;
      const tw = w * this.eyeMoveRate.value;
      const th = h * this.eyeMoveRate.value;
      const x = ix * tw - tw / 2;
      const y = iy * th - th / 2;
      const a = document.querySelector("#steering-wheel");
      const b = document.querySelector("#wheel-white");
      const c = document.querySelector("#rod");
      const d = document.querySelector("#eye-black");
      const ee = document.querySelector("#pupil");
      a.setAttribute("cx", x * 0.8);
      a.setAttribute("cy", y * 0.8);
      b.setAttribute("cx", x * 1);
      b.setAttribute("cy", y * 1);
      c.setAttribute("x1", x * 1.2);
      c.setAttribute("x2", x * 1.2);
      c.setAttribute("y1", y * 1.2 - 35);
      c.setAttribute("y2", y * 1.2 + 35);
      d.setAttribute("cx", x * 1.3);
      d.setAttribute("cy", y * 1.3);
      ee.setAttribute("cx", x * 1.4);
      ee.setAttribute("cy", y * 1.4);
    },
  },
  unmounted() {
    document.removeEventListener("mousemove", this.updateLogo);
    document.removeEventListener("touchmove", this.updateLogo);
  },
  mounted() {
    document.addEventListener("mousemove", this.updateLogo);
    document.addEventListener("touchmove", this.updateLogo);
    anime({
      targets: this.eyeMoveRate,
      keyframes: [
        { value: 0, duration: 0, easing: "linear" },
        { value: 1, delay: 4000, duration: 2000 },
      ],
    });
    anime({
      targets: "#eye-white",
      keyframes: [
        { r: 0, duration: 0, easing: "linear" },
        { r: 50, delay: 1000, duration: 2000 },
      ],
    });
    anime({
      targets: "#steering-wheel",
      keyframes: [
        { r: 0, duration: 0, easing: "linear" },
        { r: 40, delay: 1200, duration: 2000 },
      ],
    });
    anime({
      targets: "#wheel-white",
      keyframes: [
        { r: 0, duration: 0, easing: "linear" },
        { r: 30, delay: 1400, duration: 2000 },
      ],
    });
    anime({
      targets: "#rod",
      keyframes: [
        { y1: 0, y2: 0, duration: 0, easing: "linear" },
        { y1: -35, y2: 35, delay: 1600, duration: 2000 },
      ],
    });
    anime({
      targets: "#eye-black",
      keyframes: [
        { r: 0, duration: 0, easing: "linear" },
        { r: 20, delay: 1800, duration: 2000 },
      ],
    });
    anime({
      targets: "#pupil",
      keyframes: [
        { r: 0, duration: 0, easing: "linear" },
        { r: 10, delay: 2000, duration: 2000 },
      ],
    });
  },
};
</script>
<style lang="stylus" scoped>
#app-icon
  transform translate(60px, 60px)
</style>