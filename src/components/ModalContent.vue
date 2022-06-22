<template>
  <div v-if="markdownText !== null" style="min-height: 70vh;">
    <!-- TODO isAuth -->
    <MarkdownEditor
      v-if="isEdit"
    />
    <MarkdownViewer v-else />
    <DescriptionFormEdit v-if="isEditAdditional"  />
    <DescriptionViewer :additionalDescription="additionalDescription" />
  </div>
</template>

<script>
import DescriptionViewer from './editor/DescriptionViewer.vue'
import DescriptionFormEdit from './editor/DescriptionFormEdit.vue'
import MarkdownEditor from './editor/MarkdownEditor.vue'
import MarkdownViewer from './editor/MarkdownViewer.vue'
export default {
  name: "modalContent",
  components: {MarkdownEditor, MarkdownViewer, DescriptionViewer, DescriptionFormEdit},
  props: {
    modalContent: String,
    additionalDescription: Array,
    isEdit: Boolean,
    isEditAdditional: Boolean
  },
  computed: {
    markdownText() {
      return this.$store.state.markdown
    },
  },
  destroyed() {
    this.$emit("clearModalContent")
  }
}
</script>

<style scoped>
.modal-preview {
  width: 466px;
}
</style>
