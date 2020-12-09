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
    document.addEventListener("mouseup", (e) => {});
    document.addEventListener("keyup", (e) => {});
    this.$router.push("/idle");
  },
};
</script>
