<template>
  <div>
    <!-- TODO isAuth -->
    <MarkdownEditor
      v-if="this.$store.state.isAuth"
    />
    <MarkdownViewer v-else />
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue'
import MarkdownViewer from './MarkdownViewer.vue'
export default {
  name: "modalContent",
  components: {MarkdownEditor, MarkdownViewer},
  props: {
    modalContent: String,
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
