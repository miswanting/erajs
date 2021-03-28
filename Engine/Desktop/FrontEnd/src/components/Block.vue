<template lang="pug">
BlockLine(v-if="data.type === 'line'", :data="data") 
BlockGrid(v-else-if="data.type === 'grid'", :data="data") 
BlockDivider(v-else-if="data.type === 'divider'", :data="data") 
BlockGraph(v-else-if="data.type === 'graph'", :data="data") 
BlockZdog(v-else-if="data.type === 'zdog'", :data="data") 
BlockImage(v-else-if="data.type === 'img-block'", :data="data") 
div(v-else) {{ data }}
</template>
<script>
import BlockLine from "./BlockLine.vue";
import BlockGrid from "./BlockGrid.vue";
import BlockDivider from "./BlockDivider.vue";
import BlockImage from "./BlockImage.vue";
import BlockGraph from "./BlockGraph.vue";
import BlockZdog from "./BlockZdog.vue";
export default {
  props: { data: Object },
  components: {
    BlockLine,
    BlockGrid,
    BlockDivider,
    BlockImage,
    BlockGraph,
    BlockZdog,
  },
};
</script>