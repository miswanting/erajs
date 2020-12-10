<template lang="pug">
span.button(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  onClick="click",
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
    click() {
      if (!this.data.data.disabled) {
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

  :hover
    background-color var(--hover-back)

  &.disabled
    color var(--disabled-front)
    background-color var(--disabled-back)

    :hover
      color var(--disabled-front)
      background-color var(--disabled-back)
</style>