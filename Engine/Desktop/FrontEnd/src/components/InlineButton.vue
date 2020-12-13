<template lang="pug">
span.button(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  @click="click",
  ref="button"
) {{ data.data.text }}
</template>
<script>
import tippy from "tippy.js";
export default {
  props: { data: Object },
  data() {
    return {
      showPopup: false,
      tippy: null,
    };
  },
  methods: {
    click(e) {
      if (!this.data.data.disabled) {
        e.stopPropagation();
        this.$store.commit("handleEvent", {
          type: "BUTTON_CLICK",
          hash: this.data.data.hash,
        });
      }
    },
    hover(e) {
      this.tippy.show();
    },
    notHover(e) {
      this.tippy.hide();
    },
  },
  mounted() {
    if (this.data.data.popup) {
      this.tippy = tippy(this.$refs.button, {
        content: this.data.data.popup,
        theme: "span-charm",
        allowHTML: true,
      });
      this.$refs.button.addEventListener("mouseenter", this.show);
      this.$refs.button.addEventListener("mouseleave", this.hide);
    }
  },
};
</script>
<style lang="stylus" scoped>
.button
  background-color var(--interactable-back)
  margin 0px .1em
  cursor pointer

  &:hover
    color var(--hover-front)
    background-color var(--hover-back)

  &:active
    color var(--active-front)
    background-color var(--active-back)

  &.disabled
    color var(--disabled-front)
    background-color var(--disabled-back)
    cursor default

    &:hover
      color var(--disabled-front)
      background-color var(--disabled-back)

    &:active
      color var(--disabled-front)
      background-color var(--disabled-back)
</style>