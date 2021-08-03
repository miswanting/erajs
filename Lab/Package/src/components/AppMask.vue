<template lang="pug">
.app-mask(v-if="show")
</template>
<style lang="stylus" scoped>
.app-mask
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  backdrop-filter blur(2px) brightness(.75)
  z-index 1
</style>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return { show: false };
  },
});
</script>