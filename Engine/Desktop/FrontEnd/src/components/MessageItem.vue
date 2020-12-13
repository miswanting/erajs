<template lang="pug">
.message-item(:style="data.style") {{ data.data.text }}
</template>
<script>
import anime from "animejs";
export default {
  props: { data: Object },
  mounted() {
    anime({
      targets: this.$el,
      translateX: [this.$el.clientWidth, 0],
      duration: 1000,
      easing: "easeOutQuart",
      complete: (anim) => {
        setTimeout(() => {
          anime({
            targets: this.$el,
            translateX: [0, this.$el.clientWidth],
            duration: 1000,
            easing: "easeInQuart",
            complete: (anim) => {
              anime({
                targets: this.$el,
                height: "0px",
                padding: "0px",
                margin: "0px",
                duration: 1000,
                easing: "easeOutQuart",
                complete: (anim) => {
                  this.$store.commit("handleEvent", {
                    type: "MSG_TIMEOUT",
                    hash: this.data.data.hash,
                  });
                },
              });
            },
          });
        }, this.data.data.duration * 1000);
      },
    });
  },
};
</script>
<style lang="stylus" scoped>
.message-item
  backdrop-filter blur(1px) brightness(70%)
  padding .1rem .5rem
  margin .1rem
  color var(--default-front)
</style>