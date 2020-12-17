<template lang="pug">
.menu-item 
  .menu-button(v-if="data.hasOwnProperty('label')", @click="click()") {{ data.label }}
  .menu-separator(
    v-if="data.hasOwnProperty('type') && data.type === 'separator'"
  )
  .menu-anchor(v-if="data.hasOwnProperty('submenu') && show")
    .menu-list
      MenuItem(v-for="menuItem in data.submenu", :data="menuItem")
</template>
<script>
export default {
  name: "MenuItem",
  props: { data: Object },
  data() {
    return { show: false };
  },
  mounted() {
    document.addEventListener("click", this.documentClick);
  },
  unmounted() {
    document.addEventListener("click", this.documentClick);
  },
  methods: {
    click() {
      if (this.data.hasOwnProperty("submenu")) {
        this.show = !this.show;
      } else if (this.data.hasOwnProperty("click")) {
        this.data.click();
      } else {
        this.$emit("MENU_CLICK", this.data.label);
      }
    },
    documentClick(e) {
      if (this.$el.contains(e.target)) {
        e.preventDefault();
      } else {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.menu-item
  display flex

  .menu-button
    padding 0 .2rem
    color var(--default-front)
    cursor pointer
    width -webkit-fill-available

    &:hover
      background-color var(--hover-back)

  .menu-list
    position absolute
    width fit-content
    backdrop-filter blur(2px) brightness(1.2)
</style>