<template lang="pug">
BlockLine(v-if="data.type === 'line'", :data="data") 
BlockGrid(v-else-if="data.type === 'grid'", :data="data") 
BlockDivider(v-else-if="data.type === 'divider'", :data="data") 
div(v-else) {{ data }}
</template>
<script>
import BlockLine from "./BlockLine.vue";
import BlockGrid from "./BlockGrid.vue";
import BlockDivider from "./BlockDivider.vue";
export default {
  props: { data: Object },
  components: {
    BlockLine,
    BlockGrid,
    BlockDivider,
  },
};
</script>