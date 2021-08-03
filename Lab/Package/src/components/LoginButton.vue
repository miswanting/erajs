<template lang="pug">
.login-container 
  .login-button(@click="click")
    i.fa.fa-sign-in-alt
  form.login-form(v-if="show")
    div
      span User ID:
      InlineInput(v-model="id")
      span [?]
    div
      span Password:
      InlineInput(v-model="pw")
    div
      InlineButton(:data="{ text: 'Submit' }")
</template>
<style lang="stylus" scoped>
.login-form
  position absolute
  right 0
  z-index 2
  padding .2rem
  box-shadow 0 0 3px #000
</style>
<script lang="ts">
import { defineComponent } from "vue";
import InlineInput from "./InlineInput.vue";
import InlineButton from "./InlineButton.vue";
export default defineComponent({
  components: { InlineInput, InlineButton },
  data() {
    return { show: false, id: "", pw: "" };
  },
  methods: {
    click() {
      this.show = !this.show;
    },
  },
});
</script>