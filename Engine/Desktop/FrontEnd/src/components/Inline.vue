<template lang="pug">
InlineText(v-if="data.type === 'text'", :data="data") 
InlineButton(v-else-if="data.type === 'button'", :data="data") 
InlineHeading(v-else-if="data.type === 'heading'", :data="data") 
InlineLink(v-else-if="data.type === 'link'", :data="data") 
InlineProgress(v-else-if="data.type === 'progress'", :data="data") 
InlineRate(v-else-if="data.type === 'rate'", :data="data") 
InlineCheck(v-else-if="data.type === 'check'", :data="data") 
InlineRadio(v-else-if="data.type === 'radio'", :data="data") 
InlineInput(v-else-if="data.type === 'input'", :data="data") 
InlineDropdown(v-else-if="data.type === 'dropdown'", :data="data") 
InlineImage(v-else-if="data.type === 'img-inline'", :data="data") 
br(v-else-if="data.type === 'br'") 
span(v-else) {{ data }}
</template>
<script>
import InlineText from "./InlineText.vue";
import InlineButton from "./InlineButton.vue";
import InlineHeading from "./InlineHeading.vue";
import InlineLink from "./InlineLink.vue";
import InlineProgress from "./InlineProgress.vue";
import InlineRate from "./InlineRate.vue";
import InlineCheck from "./InlineCheck.vue";
import InlineRadio from "./InlineRadio.vue";
import InlineInput from "./InlineInput.vue";
import InlineDropdown from "./InlineDropdown.vue";
import InlineImage from "./InlineImage.vue";
export default {
  props: { data: Object },
  components: {
    InlineText,
    InlineButton,
    InlineHeading,
    InlineLink,
    InlineProgress,
    InlineRate,
    InlineCheck,
    InlineRadio,
    InlineInput,
    InlineDropdown,
    InlineImage,
  },
};
</script>