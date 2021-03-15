<template lang="pug">
.message
  transition-group.message-system(
    tag="div",
    name="message-item",
    @leave="leave"
  )
    .message-item(v-for="msg in msgs", :key="msg.data.hash") {{ msg.data.text }}
</template>
<script>
import anime from "animejs";
export default {
  computed: {
    msgs: function () {
      return this.$store.state.msgs;
    },
  },
  methods: {
    leave(el, done) {
      anime({
        targets: el,
        translateX: "100%",
        easing: "easeInCubic",
        complete: () => {
          anime({
            targets: el,
            height: 0,
            easing: "easeOutCubic",
            complete: done,
          });
        },
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.message
  z-index 10

  .message-system
    position absolute
    right 0
    display flex
    flex-direction column
    align-items flex-end
    max-width 50%

    .message-item
      color var(--default-front)
      width fit-content
      align-self flex-end
      backdrop-filter blur(2px) brightness(.7)
      padding 0 .5rem

    .message-item-enter-active
      transition all 2s ease

    .message-item-enter-from
      transform translateX(100%)
</style>