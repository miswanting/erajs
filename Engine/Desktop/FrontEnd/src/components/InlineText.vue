<template lang="pug">
span.text(:style="this.data.style") {{ this.data.data.text }}
</template>
<script>
export default {
  props: { data: Object },
};
</script>
<style lang="stylus" scoped></style>