<template lang="pug">
span.text(
  :class="{ shake: shake, 'shake-constant': shake }",
  :style="data.style"
) {{ data.data.text }}
</template>
<script>
export default {
  props: { data: Object },
  data() {
    return { shake: false };
  },
  mounted() {
    if (this.data.style.hasOwnProperty("shake_duration")) {
      this.shake = true;
      setTimeout(() => {
        this.shake = false;
      }, this.data.style.shake_duration * 1000);
    }
  },
};
</script>
<style lang="stylus" scoped>
.text
  display inline-block
</style>