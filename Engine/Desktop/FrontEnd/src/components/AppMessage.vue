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
<style lang="stylus" scoped></style>