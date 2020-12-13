<script>
import { h } from "vue";
export default {
  props: { data: Object },
  data() {
    return { shake: false };
  },
  mounted() {
    if (this.data.style.hasOwnProperty("shake_duration")) {
      this.shake = true;
      setTimeout(() => {
        this.shake = false;
      }, this.data.style.shake_duration * 1000);
    }
  },
  render() {
    return h(
      "h" + this.data.data.rank.toString(),
      {
        class: {
          shake: this.shake,
          "shake-constant": this.shake,
        },
        style: this.data.style,
      },
      this.data.data.text
    );
  },
};
</script>
<style lang="stylus" scoped>
.heading
  display inline-block
</style>