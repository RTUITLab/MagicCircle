<template>
   <div class="d-block text-center">
     <div 
      v-html="markdownToHtml"
      class="markdown-preview"
      />
  </div>
</template>
<script>
import { marked } from 'marked'

export default {
  data() {
    return {}
  },
  computed: {
   markdownToHtml(){
    //  this.$store.dispatch('changeMarkdown', this.markdown)
      return marked(this.$store.state.markdown);
   }
  },
}
</script>
<style scoped>
.markdown-preview {
  text-align: left;
  /* max-width: 380px; */
}
</style>