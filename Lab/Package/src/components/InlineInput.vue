<template lang="pug">
span.input-container
  span.prompt [
  span.input(ref="input", contenteditable="true", @input="input")
  span.prompt ]
</template>
<style lang="stylus" scoped>
.input-container
  cursor text
  background-color var(--interactable-back)

  &:hover
    color var(--hover-front)
    background-color var(--hover-back)

  &:active
    color var(--active-front)
    background-color var(--active-back)

  &.disabled
    color var(--disabled-front)
    background-color var(--disabled-back)

    &:hover
      color var(--disabled-front)
      background-color var(--disabled-back)

    &:active
      color var(--disabled-front)
      background-color var(--disabled-back)

  .input
    display inline-block
    min-width 2rem
    outline none
    border-bottom solid
</style>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: { modelValue: String },
  data() {
    return { value: this.modelValue };
  },
  mounted() {
    this.$refs.input.innerText = this.value;
  },
  methods: {
    input(e) {
      this.value = e.target.innerText;
      this.$emit("update:modelValue", this.value);
      this.$emit("input", this.value);
    },
  },
});
</script>