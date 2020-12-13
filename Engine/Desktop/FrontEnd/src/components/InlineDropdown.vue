<template lang="pug">
span.dropdown(
  :class="{ disabled: data.data.disabled }",
  :style="data.style",
  @click="click"
) 
  span.dropdown-text {{ data.data.text_list[index] }}
  span.dropdown-icon {{ icon }}
  span.dropdown-anchor(v-if="show")
    span.dropdown-list
      span.dropdown-item(v-for="(item, i) in items", @click="clickItem(i)") {{ item.text }}
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
      items = [];
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
        ["dropdown-item", "dropdown-icon"].indexOf(e.target.className) !== -1
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
  margin 0rem .2rem
  user-select none
  background-color var(--interactable-back)
  cursor pointer

.dropdown-anchor
  position absolute
  top 0rem
  left 0rem
  width 0rem
  height 0rem

.dropdown-menu
  display none
  position absolute
  bottom 0rem
  left 0rem
  /* background-color: var(--interactable-back); */
  width max-content
  border .5px solid gray
  backdrop-filter blur(5px) opacity(90%)

.dropdown-menu.show
  display block

.dropdown-menu-item
  min-width 50px
  padding 0 .2rem
</style>