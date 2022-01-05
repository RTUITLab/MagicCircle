<template>
  <div class="d-block text-center">
    <div class="modal-direction">
      <div class="modal__title">
        Описание должности:
      </div>
      <div class="modal__content">
        {{this.modalContent.direction}}
      </div>
    </div>
    <div class="modal-activity">
      <div class="modal__title">
        Чем занимается:
      </div>
      <div class="modal__content">
        {{this.modalContent.typeOfActivity}}
      </div>
    </div>
    <div class="modal-requirements">
      <div class="modal__title">
        Требования к должности:
      </div>
      <div class="modal__content">
        {{this.modalContent.requirements}}
      </div>
    </div>
    <div class="modal-how-become">
      <div class="modal__title">
        Как стать:
      </div>
      <div class="modal__content">
        {{this.modalContent.howBecome}}
      </div>
    </div>
    <div class="modal-career">
      <div class="modal__title">
        Куда и как расти дальше:
      </div>
      <div class="modal__content">
        {{this.modalContent.careerGrowth}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalContent",
  props: {
    modalContent: Object,
  },
  mounted() {
    console.log('modalCobntent: ', this.modalContent)
  }
}
</script>

<style scoped>

</style>
