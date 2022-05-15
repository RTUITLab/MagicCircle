<template>
  <div>
    <!-- TODO isAuth -->
    <MarkdownEditor
      v-show="this.$store.state.isAdmin"
    />
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue'
export default {
  name: "modalContent",
  components: {MarkdownEditor},
  props: {
    modalContent: Object,
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
