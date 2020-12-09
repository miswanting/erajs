<template lang="pug">
AppHeader
main.idle
  SplashCanvas
  .center-group
    .engine-name Era.js
    AppLogo
    .load-title {{ $store.state.loadTitle }}
    .load-text(v-for="loadText in loadTexts") {{ loadText }}
</template>
<script>
import { h } from "vue";
import AppHeader from "./AppHeader.vue";
import SplashCanvas from "./SplashCanvas.vue";
import AppLogo from "./AppLogo.vue";
export default {
  components: {
    AppHeader,
    SplashCanvas,
    AppLogo,
  },
  computed: {
    loadTexts() {
      return this.$store.state.loadText.split("\n");
    },
  },
};
</script>
<style lang="stylus" scoped>
.idle
  flex-grow 1
  display grid
  place-items center

  #splash-canvas
    position absolute

  .center-group
    text-align center

  .engine-name
    font-size 3rem
    font-weight bold
    color var(--o)

  #icon-icon
    transform translate(60px, 60px)

  .load-title
    font-weight bold
    color var(--o)

  .load-text
    color var(--n)
</style>