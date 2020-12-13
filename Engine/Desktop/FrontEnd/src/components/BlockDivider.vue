<template lang="pug">
.divider(:style="data.style")
  br
  .divider-line
  .divider-text(v-if="data.data.text") {{ data.data.text }}
  .divider-line(v-if="data.data.text")
</template>
<script>
export default {
  props: { data: Object },
};
</script>
<style lang="stylus" scoped>
.divider
  display flex

  .divider-text
    margin 0em .2em

  .divider-line
    flex-grow 1
    height 1px
    align-self center
    background-color var(--default-front)
</style>