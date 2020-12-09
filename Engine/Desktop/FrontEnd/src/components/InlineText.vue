<template lang="pug">
span.text {{ this.data.data.text }}
</template>
<script>
export default {
  props: { data: Object },
};
</script>
<style lang="stylus" scoped></style>