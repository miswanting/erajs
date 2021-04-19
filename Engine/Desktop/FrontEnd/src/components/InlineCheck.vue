<template lang="pug">
span.check(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  @click="click"
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
  color var(--interactable-front)
  background-color var(--interactable-back)

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