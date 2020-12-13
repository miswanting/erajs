<template lang="pug">
span.progress(:style="data.style[0]") 
  span.bar(:style="data.style[1]") 
</template>
<script>
export default {
  props: { data: Object },
  data() {
    return { shake: false };
  },
  mounted() {
    if (!this.data.style[0].hasOwnProperty("width")) {
      this.data.style[0].width = "100px";
    }
    this.data.style[1].width = `${
      (this.data.data.now / this.data.data.max) * 100
    }%`;
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