<template lang="pug">
AppMask
AppHeader
AppBody(:type="type")
AppFooter
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AppMask from "../components/AppMask.vue";
import AppHeader from "../components/AppHeader.vue";
import AppBody from "../components/AppBody.vue";
import AppFooter from "../components/AppFooter.vue";
export default defineComponent({
  components: { AppMask, AppHeader, AppBody, AppFooter },
  data() {
    return { type: "login" };
  },
});
</script>