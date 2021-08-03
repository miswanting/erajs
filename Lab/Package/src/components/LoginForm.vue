<template lang="pug">
.login-form-container 
  .login-form(style="text-align: center")
    div(style="font-weight: bold") Login
    div 
      span Player ID:
      InlineInput(v-model="playerID")
    InlineButton(:data="{ text: 'Submit' }", @click="click")
    //- div(@click="click") Submit
</template>
<style lang="stylus" scoped>
.login-form-container
  display grid
  place-items center
  height 100%

  .login-form
    display flex
    flex-direction column
    padding 1rem
</style>
<script lang="ts">
import { defineComponent } from "vue";
import InlineInput from "./InlineInput.vue";
import InlineButton from "./InlineButton.vue";
export default defineComponent({
  components: { InlineInput, InlineButton },
  data() {
    return { playerID: "" };
  },
  methods: {
    click() {
      this.$store.dispatch("send", {
        type: "SetPlayerID",
        data: this.playerID,
      });
    },
  },
});
</script>