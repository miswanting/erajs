<template lang="pug">
RouterView
</template>
<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
  mounted() {
    document.addEventListener("mouseup", (e) => {
      console.log("[DEBG]鼠标点击：", e.which);
      let data = {
        type: "MOUSE_CLICK",
        value: e.which,
      };
      this.$store.commit("handleEvent", data);
    });
    document.addEventListener("keyup", (e) => {
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
    this.$router.push("/idle");
  },
};
</script>
