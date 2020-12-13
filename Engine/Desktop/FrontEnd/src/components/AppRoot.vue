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
    this.$router.push("/idle");
  },
};
</script>
