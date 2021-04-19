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
  unmounted() {
    this.$refs.button.removeEventListener("mouseenter", this.show);
    this.$refs.button.removeEventListener("mouseleave", this.hide);
    this.tippy.unmount();
    this.tippy.destroy();
  },
};
</script>
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