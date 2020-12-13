<template lang="pug">
span.dropdown(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  @click="click"
) 
  span.dropdown-icon {{ icon }}
  span.dropdown-text {{ data.data.text_list[index] }}
  span.dropdown-anchor(v-if="show")
    .dropdown-list
      .dropdown-item(v-for="(item, i) in items", @click="clickItem(i)") {{ item.text }}
</template>
<script>
export default {
  props: { data: Object },
  data() {
    return {
      icon: "△",
      show: false,
      index: this.data.data.default_index,
    };
  },
  mounted() {
    document.addEventListener("click", this.documentClick);
  },
  unmounted() {
    document.removeEventListener("click", this.documentClick);
  },
  computed: {
    items() {
      const items = [];
      for (let i = 0; i < this.data.data.text_list.length; i++) {
        items.push({
          text: this.data.data.text_list[i],
        });
      }
      return items;
    },
  },
  methods: {
    click() {
      this.show = !this.show;
    },
    clickItem(i) {
      this.index = i;
      this.$store.commit("handleEvent", {
        type: "DROPDOWN_CHANGE",
        index: this.index,
        value: this.data.data.text_list[this.index],
        hash: this.data.data.hash,
      });
    },
    documentClick(e) {
      if (
        ["dropdown-item", "dropdown-icon", "dropdown-text"].indexOf(
          e.target.className
        ) !== -1
      ) {
        e.preventDefault();
      } else {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.dropdown
  position relative
  cursor pointer
  background-color var(--interactable-back)

  &:hover
    color var(--hover-front)
    background-color var(--hover-back)

  &:active
    color var(--active-front)
    background-color var(--active-back)

  .dropdown-icon
    font-size .5rem
    vertical-align top

  .dropdown-anchor
    position absolute
    top 0rem
    left 0rem
    width 0rem
    height 0rem

  .dropdown-list
    position absolute
    bottom 0rem
    left 0rem
    width max-content
    border .5px solid gray
    backdrop-filter blur(5px) opacity(90%)

  .dropdown-item
    min-width 50px
    padding 0 .2rem

    &:hover
      color var(--hover-front)
      background-color #fff2

    &:active
      color var(--active-front)
      background-color #fff4
</style>