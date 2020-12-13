<template lang="pug">
span.link(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  @click="click",
  ref="link"
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
          type: "LINK_CLICK",
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
.link
  color var(--interactable-front)
  text-decoration-line underline
  text-decoration-style dashed
  margin 0px .1em
  cursor pointer

  &:hover
    text-decoration underline
    color var(--hover-front)

  &:active
    color var(--active-front)

  &.disabled
    color var(--disabled-front)
    cursor default
    text-decoration-line underline
    text-decoration-style dashed

    &:hover
      color var(--disabled-front)
      text-decoration-line underline
      text-decoration-style dashed

    &:active
      color var(--disabled-front)
      text-decoration-line underline
      text-decoration-style dashed
</style>