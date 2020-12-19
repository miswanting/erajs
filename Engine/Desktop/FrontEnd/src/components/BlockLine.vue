<template lang="pug">
.line
  br(v-if="this.data.children.length === 0")
  Inline(v-for="inline in this.data.children", :data="inline")
</template>
<script>
import Inline from "./Inline.vue";
export default {
  props: { data: Object },
  components: {
    Inline,
  },
};
</script>
<style lang="stylus" scoped></style>