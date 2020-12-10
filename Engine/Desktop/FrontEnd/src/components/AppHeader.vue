<template lang="pug">
.header
  .menu-bar
    MenuItem(v-for="menuItem in $store.state.menu", :data="menuItem")
  .title-bar {{ $store.state.title }}
  .operate-bar
    .min(@click="min") ●
    .max(@click="max") ●
    .close(@click="close") ●
</template>
<script>
import { remote } from "electron";
import MenuItem from "./MenuItem.vue";
export default {
  data() {
    return { isMax: false };
  },
  methods: {
    min() {
      remote.getCurrentWindow().minimize();
    },
    max() {
      if (this.isMax) {
        remote.getCurrentWindow().unmaximize();
      } else {
        remote.getCurrentWindow().maximize();
      }
      this.isMax = !this.isMax;
    },
    close() {
      remote.getCurrentWindow().close();
    },
  },
  components: {
    MenuItem,
  },
};
</script>
<style lang="stylus" scoped>
.header
  display flex

  .menu-bar
    display flex

    >.menu-item
      display block

  .title-bar
    flex-grow 1
    text-align center
    color var(--default-front)
    background-color var(--default-back)
    -webkit-app-region drag

  .operate-bar
    display flex
    color var(--default-front)
    cursor pointer

    > div
      padding 0 .2rem
      background-color var(--default-back)

    :hover
      background-color var(--hover-back)

      .min
        color #0f0

      .max
        color #ff0

      .close
        color #f00
</style>