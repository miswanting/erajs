<template lang="pug">
.message
  .message-anchor
    MessageItem(v-for="msg in $store.state.msgs", :data="msg")
</template>
<script>
import MessageItem from "./MessageItem.vue";
export default {
  components: {
    MessageItem,
  },
};
</script>
<style lang="stylus" scoped>
.message
  z-index 10

  .message-anchor
    position absolute
    right 0
    display flex
    flex-direction column
    align-items flex-end
</style>