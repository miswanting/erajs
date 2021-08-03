<template lang="pug">
main.app-body
  BodyMask
  LoginForm(v-if="type === 'login'")
  div(v-else="") AppBody
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BodyMask from "../components/BodyMask.vue";
import LoginForm from "../components/LoginForm.vue";
export default defineComponent({
  components: { BodyMask, LoginForm },
  props: { type: String },
});
</script>
<style lang="stylus" scoped>
.app-body
  flex-grow 1
  position relative
</style>