<template lang="pug">
header.app-header
  HeaderMenu
  .title Era.js Game Engine
  LoginButton
</template>
<style lang="stylus" scoped>
.app-header
  display flex

  .title
    flex-grow 1
    text-align center
</style>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderMenu from "./HeaderMenu.vue";
import LoginButton from "./LoginButton.vue";
export default defineComponent({
  components: { HeaderMenu, LoginButton },
});
</script>