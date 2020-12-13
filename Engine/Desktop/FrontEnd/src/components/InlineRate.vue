<template lang="pug">
span.rate(:class="{ disabled: data.data.disabled }", :style="data.style") 
  span.rate-item(v-for="(item, i) in items", @click="click(i + 1)") {{ item }}
</template>
<script>
export default {
  props: { data: Object },
  data() {
    let falseIcon = "☆";
    let trueIcon = "★";
    if (this.data.style.hasOwnProperty("false_icon")) {
      falseIcon = this.data.style.false_icon;
    }
    if (this.data.style.hasOwnProperty("true_icon")) {
      trueIcon = this.data.style.true_icon;
    }
    return {
      now: this.data.data.now,
      falseIcon: falseIcon,
      trueIcon: trueIcon,
    };
  },
  computed: {
    items() {
      const items = [];
      for (let i = 0; i < this.data.data.max; i++) {
        if (i < this.now) {
          items.push(this.trueIcon);
        } else {
          items.push(this.falseIcon);
        }
      }
      return;
    },
  },
  methods: {
    click(i) {
      if (!this.data.data.disabled) {
        if (i === this.now) {
          i = 0;
        }
        this.$store.commit("handleEvent", {
          type: "RATE_CLICK",
          value: i,
          hash: this.data.data.hash,
        });
        this.now = i;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.rate
  cursor pointer
  background-color var(--interactable-back)

.rate > .rate-item:hover
  color var(--hover-front)
  background-color var(--hover-back)

.rate.disabled
  cursor default
  background-color var(--default-back)

.rate.disabled > .rate-item:hover
  color var(--default-front)
  background-color var(--default-back)
</style>