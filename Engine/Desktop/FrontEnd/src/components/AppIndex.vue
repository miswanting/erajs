<template lang="pug">
AppHeader
AppMessage
main.index
  section.page(v-for="page in $store.state.main.children")
    Block(v-for="block in page.children", :data="block")
footer {{ $store.state.footer }}
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppMessage from "./AppMessage.vue";
import Block from "./Block.vue";
export default {
  components: {
    AppHeader,
    AppMessage,
    Block,
  },
};
</script>
<style lang="stylus" scoped>
.index
  flex-grow 1
</style>