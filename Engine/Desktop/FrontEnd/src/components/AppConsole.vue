<template lang="pug">
AppHeader
AppMessage
main.console(ref)
  #console-input(contenteditable, spellcheck="false")
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppMessage from "./AppMessage.vue";
export default {
  mounted() {
    this.$el.addEventListener("mouseup", this.focus);
  },
  unmounted() {
    this.$el.removeEventListener("mouseup", this.focus);
  },
  methods: {
    focus() {
      document.querySelector("#input-span").focus();
    },
  },
  components: {
    AppHeader,
    AppMessage,
  },
};
</script>
<style lang="stylus" scoped>
.console
  flex-grow 1
  color var(--default-front)
  background-color var(--default-back)

  #console-input
    outline none
</style>