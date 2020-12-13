<template lang="pug">
span.check(
  @click="click",
  :class="{ disabled: data.data.disabled }",
  :style="data.style"
) 
  span.check-icon {{ value ? trueIcon : falseIcon }}
  span.check-text {{ data.data.text }}
</template>
<script>
export default {
  props: { data: Object },
  data() {
    let falseIcon = "◻";
    let trueIcon = "◼";
    if (this.data.style.hasOwnProperty("false_icon")) {
      falseIcon = this.data.style.false_icon;
    }
    if (this.data.style.hasOwnProperty("true_icon")) {
      trueIcon = this.data.style.true_icon;
    }
    return {
      value: this.data.data.default,
      falseIcon: falseIcon,
      trueIcon: trueIcon,
    };
  },
  methods: {
    click() {
      this.$store.commit("handleEvent", {
        type: "CHECK_CHANGE",
        value: !this.value,
        hash: this.data.data.hash,
      });
      this.value = !this.value;
    },
  },
};
</script>
<style lang="stylus" scoped>
.check
  cursor pointer
  background-color var(--interactable-back)

  &:hover
    color var(--hover-front)
    background-color var(--hover-back)

  &:active
    color var(--active-front)
    background-color var(--active-back)

  &.disabled
    cursor default
    color var(--disabled-front)
    background-color var(--disabled-back)

    &:hover
      color var(--disabled-front)
      background-color var(--disabled-back)

    &:active
      color var(--disabled-front)
      background-color var(--disabled-back)
</style>