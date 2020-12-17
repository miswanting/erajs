<template lang="pug">
img.img-inline(:src="content", :style="data.style")
</template>
<script>
export default {
  props: { data: Object },
  computed: {
    contentType() {
      if (this.data.data.type === "apng") return "image/apng";
      else if (this.data.data.type === "bmp") return "image/bmp";
      else if (this.data.data.type === "gif") return "image/gif";
      else if (["ico", "cur"].indexOf(this.data.data.type) !== -1)
        return "image/x-icon";
      else if (
        ["jpg", "jpeg", "jfif", "pjpeg", "pjp"].indexOf(this.data.data.type) !==
        -1
      )
        return "image/jpeg";
      else if (this.data.data.type === "png") return "image/png";
      else if (this.data.data.type === "svg") return "image/svg+xml";
      else if (["tif", "tiff"].indexOf(this.data.data.type) !== -1)
        return "image/tiff";
      else if (this.data.data.type === "webp") return "image/webp";
    },
    content() {
      return `data:${this.contentType};base64,${this.data.data.data}`;
    },
  },
};
</script>
<style lang="stylus" scoped>
.img-inline
  // text-align center
</style>