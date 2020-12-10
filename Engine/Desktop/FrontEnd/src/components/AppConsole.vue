<template lang="pug">
AppHeader
AppMessage
main.console(ref="console")
  .input-bar
    .info1
      span ┌─ ~ debug@Era.js
    .info2
      span └&gt;&ensp;
      span#console-input(contenteditable, spellcheck="false")
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppMessage from "./AppMessage.vue";
export default {
  mounted() {
    this.$refs.console.addEventListener("mouseup", this.focus);
  },
  unmounted() {
    this.$refs.console.removeEventListener("mouseup", this.focus);
  },
  methods: {
    focus(e) {
      const el = document.querySelector("#console-input");
      if (el.innerText.length > 0 && e.target !== el) {
        const s = window.getSelection();
        const r = document.createRange();
        r.setStart(el, 1);
        r.setEnd(el, 1);
        s.removeAllRanges();
        s.addRange(r);
      }
      el.focus();
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