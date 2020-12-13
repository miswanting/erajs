<template lang="pug">
span.radio(:class="{ disabled: data.data.disabled }", :style="data.style") 
  span.radio-item(v-for="(item, i) in items", @click="click(i)")
    span.check-icon {{ item.icon }}
    span.check-text {{ item.text }}
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
      index: this.data.data.default_index,
      falseIcon: falseIcon,
      trueIcon: trueIcon,
    };
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
    click(i) {
      this.$store.commit("handleEvent", {
        type: "RADIO_CHANGE",
        index: i,
        hash: this.data.data.hash,
      });
      this.index = i;
    },
  },
};
</script>
<style lang="stylus" scoped>
.radio
  cursor pointer
  background-color var(--interactable-back)

  .radio-item:hover
    color var(--hover-front)
    background-color var(--hover-back)

  .radio-item:active
    color var(--active-front)
    background-color var(--active-back)

  &.disabled
    cursor default
    color var(--disabled-front)
    background-color var(--disabled-back)

    .radio-item:hover
      color var(--disabled-front)
      background-color var(--disabled-back)

    .radio-item:active
      color var(--disabled-front)
      background-color var(--disabled-back)
</style>