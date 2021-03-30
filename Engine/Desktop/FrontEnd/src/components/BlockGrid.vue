<template lang="pug">
.grid
  table
    tbody
      tr(v-for="row in rows")
        td(v-for="column in row", :style="{ width: widthText }")
          Inline(v-for="inline in column", :data="inline")
</template>
<script>
import Inline from "./Inline.vue";
export default {
  props: { data: Object },
  components: { Inline },
  computed: {
    widthText() {
      return `${100 / this.data.data.column}%`;
    },
    rows() {
      const columns = [];
      let column = [];
      for (let i = 0; i < this.data.children.length; i++) {
        const inlineData = this.data.children[i];
        if (inlineData.type === "pass") {
          if (column.length === 0) {
            column.push({ type: "br" });
          }
          columns.push(column);
          column = [];
        } else {
          column.push(inlineData);
        }
      }
      if (column.length === 0) {
        column.push({ type: "br" });
      }
      columns.push(column);
      const rows = [];
      for (
        let i = 0;
        i < Math.ceil(columns.length / this.data.data.column);
        i++
      ) {
        const row = [];
        for (let j = 0; j < this.data.data.column; j++) {
          if (i * this.data.data.column + j < columns.length) {
            row.push(columns[i * this.data.data.column + j]);
          } else {
            row.push([]);
          }
        }
        rows.push(row);
      }
      return rows;
    },
  },
};
</script>
<style lang="stylus" scoped>
table
  width -webkit-fill-available

  td
    text-align center
</style>