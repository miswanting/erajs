<template lang="pug">
AppHeader
AppMessage
main.index(ref="index")
  section.page(
    v-for="(page, i) in $store.state.main.children",
    :class="{ disabled: i < $store.state.main.children.length - 1 }",
    :style="page.style"
  )
    .disable-mask
    Block(v-for="block in page.children", :data="block")
footer(:style="$store.state.footer.style") {{ $store.state.footer.data.text }}
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppMessage from "./AppMessage.vue";
import Block from "./Block.vue";
export default {
  mounted() {
    this.$refs.index.addEventListener("mouseup", (e) => {
      console.log("[DEBG]鼠标点击：", e.which);
      let data = {
        type: "MOUSE_CLICK",
        value: e.which,
      };
      this.$store.commit("handleEvent", data);
    });
    this.$refs.index.addEventListener("keyup", (e) => {
      console.log("[DEBG]键盘按下：", e.key);
      if (e.key === "`") {
        console.log(this.$route.path);
        if (this.$route.path === "/console") {
          this.$router.back();
        } else {
          this.$router.push("/console");
        }
      } else if (e.key === "Escape") {
        if (this.$route.path === "/pause") {
          this.$router.back();
        } else {
          this.$router.push("/pause");
        }
      }
      let data = {
        type: "KEY_UP",
        value: e.key,
      };
      this.$store.commit("handleEvent", data);
    });
  },
  watch: {
    "$store.state.main": {
      deep: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          const el = this.$refs.index;
          el.scrollTop = el.scrollHeight;
        });
      },
    },
  },
  components: {
    AppHeader,
    AppMessage,
    Block,
  },
};
</script>
<style lang="stylus" scoped>
.index
  flex-grow 1
  color var(--default-front)
  background-color var(--default-back)
  height -webkit-fill-available
  overflow-y auto

  &::-webkit-scrollbar
    width 6px

  &::-webkit-scrollbar-thumb
    background var(--interactable-back)
    border-radius 3px

  .page
    margin .3rem
    padding .3rem
    border 1px solid var(--hover-back)
    border-radius .3rem
    position relative

    &.disabled
      .disable-mask
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        backdrop-filter blur(1px)
        z-index 1

footer
  color var(--default-front)
  background-color var(--default-back)
</style>