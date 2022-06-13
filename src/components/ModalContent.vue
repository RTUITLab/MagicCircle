<template>
  <div>
    <!-- TODO isAuth -->
    <MarkdownEditor
      v-if="isEdit"
    />
    <MarkdownViewer v-else />
    <DescriptionFormEdit v-show="isEditAdditional"  />
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
