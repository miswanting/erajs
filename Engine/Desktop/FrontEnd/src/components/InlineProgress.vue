<template lang="pug">
span.progress(:style="data.style[0]") 
  span.bar(:style="data.style[1]", ref="bar", :class="id") 
</template>
<script>
import anime from "animejs";
export default {
  props: { data: Object },
  data() {
    return { shake: false, id: "b" + Math.random().toString().slice(2, 8) };
  },
  mounted() {
    const color = ["red", "orange", "lime"];
    const cfg = {
      value: this.data.data.now,
      min: this.data.data.min,
      max: this.data.data.max,
      low: this.data.data.low,
      high: this.data.data.high,
      best: this.data.data.best,
      duration: this.data.data.duration,
      from: this.data.data.from,
      ease: this.data.data.ease,
    };
    function getColorIndex(value, low, high, best) {
      let bestIndex = 0;
      if (best > low) {
        bestIndex++;
      }
      if (best > high) {
        bestIndex++;
      }
      let valueIndex = 0;
      if (value > low) {
        valueIndex++;
      }
      if (value > high) {
        valueIndex++;
      }
      return 2 - Math.abs(bestIndex - valueIndex);
    }
    let bcolor = color[getColorIndex(cfg.value, cfg.low, cfg.high, cfg.best)];
    if (!this.data.style[0].hasOwnProperty("width")) {
      this.data.style[0].width = "100px";
    }
    if (cfg.duration === 0) {
      this.data.style[1].width = `${(cfg.value / (cfg.max - cfg.min)) * 100}%`;
      this.data.style[1]["background-color"] = bcolor;
    } else {
      const handler = {
        value: cfg.from,
        width: `${(cfg.from / (cfg.max - cfg.min)) * 100}%`,
      };
      const el = document.querySelector(`.${this.id}`);
      anime({
        targets: handler,
        value: cfg.value,
        width: `${(cfg.value / (cfg.max - cfg.min)) * 100}%`,
        duration: cfg.duration * 1000,
        easing: cfg.ease,
        update: () => {
          el.style = `width:${handler.width};background-color:${
            color[getColorIndex(handler.value, cfg.low, cfg.high, cfg.best)]
          }`;
        },
      });
    }
  },
};
</script>
<style lang="stylus" scoped>
.progress
  position relative
  display inline-block
  background-color var(--interactable-back)
  vertical-align middle
  height 1rem
  margin 0rem .2rem
  border-radius .2rem

  .bar
    position absolute
    background-color var(--default-front)
    height 100%
    border-radius .2rem
    left 0px
</style>