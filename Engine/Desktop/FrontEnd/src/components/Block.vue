<template lang="pug">
BlockLine(v-if="this.data.type === 'line'", :data="this.data") 
</template>
<script>
import BlockLine from "./BlockLine.vue";
export default {
  props: { data: Object },
  components: {
    BlockLine,
  },
};
</script>
<style lang="stylus" scoped></style>