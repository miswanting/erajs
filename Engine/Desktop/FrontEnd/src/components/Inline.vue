<template lang="pug">
InlineText(v-if="this.data.type === 'text'", :data="this.data") 
</template>
<script>
import InlineText from "./InlineText.vue";
export default {
  props: { data: Object },
  components: {
    InlineText,
  },
};
</script>
<style lang="stylus" scoped></style>