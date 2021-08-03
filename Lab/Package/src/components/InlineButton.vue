<template lang="pug">
span.button(@click="click") {{ data.text }}
</template>
<style lang="stylus" scoped>
.button
  cursor pointer
  color var(--interactable-front)
  background-color var(--interactable-back)
  margin 0 .1rem

  &:hover
    filter brightness(1.1)

  &:active
    filter brightness(1.2)

  &.disabled
    cursor default
    filter brightness(.85)

    &:hover, &:active
      filter brightness(.85)
</style>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: { data: Object, style: Object },
  methods: {
    click() {
      this.$emit("click");
    },
  },
});
</script>