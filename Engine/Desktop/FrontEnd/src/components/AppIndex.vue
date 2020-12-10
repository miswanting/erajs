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
  mounted() {
  },
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
  color var(--default-front)
  background-color var(--default-back)

  .page
    margin .3rem
    padding .3rem
    border 1px solid var(--hover-back)
    border-radius .3rem

footer
  color var(--default-front)
  background-color var(--default-back)
</style>