<template lang="pug">
span.input(:class="{ disabled: data.data.disabled }", :style="data.style") 
  span.prompt [
  span.value(ref="input", contenteditable, @input="input")
  span.prompt ]
</template>
<script>
export default {
  props: { data: Object },
  data() {
    return {
      value: this.data.data.default,
    };
  },
  mounted() {
    this.$refs.input.innerText = this.value;
  },
  watch: {
    value() {
      this.$store.commit("handleEvent", {
        type: "INPUT_CHANGE",
        value: this.value,
        hash: this.data.data.hash,
      });
    },
  },
  computed: {
    items() {
      const items = [];
      for (let i = 0; i < this.data.data.text_list.length; i++) {
        items.push({
          icon: this.index === i ? this.trueIcon : this.falseIcon,
          text: this.data.data.text_list[i],
        });
      }
      return items;
    },
  },
  methods: {
    input(e) {
      this.value = e.target.innerText;
    },
  },
};
</script>
<style lang="stylus" scoped>
.input
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

  .value
    display inline-block
    min-width 2rem
    outline none
</style>