<template>
  <div class="edit-form">
    <multiselect 
      class="edit-form__select"
      v-model="selectedDirection" 
      placeholder="Выберите направление" 
      label="name"
      track-by="id"
      :options="directions"
    />
    <multiselect 
      class="edit-form__select"
      v-model="selectedProfile" 
      placeholder="Выберите профиль" 
      label="name"
      :disabled="selectedDirection === '' || selectedDirection === null" 
      track-by="id"
      :options="profiles"
      @input="setAdditional()"
    />
    <div class="edit-form__description">
      <span class="edit-form__label">Описание профиля</span>
      <b-form-textarea 
        v-model="additDescription" 
        rows="3"
        max-rows="6"
        type="textarea" 
        class="edit-form__textarea" 
      />
    </div>
  </div>
</template>
<script>
import api from '../../services/api'
export default {
  data() {
    return {
      selectedDirection: '',
      selectedProfile: '',

      profiles: [],

      isDisableProfileInput: true,
      additDescription: '',
    }
  },
  computed: {
    selectedSector() {
      return this.$store.state.sectorList.find((sector) => 
        sector.coords === this.$store.state.selectedSector.coords)
    },
    directions() {
      return this.$store.state.selectedSector.institutes.find((inst) => inst.id === this.$store.state.adminInstituteId).directions
    },
  },
  watch: {
    selectedDirection: function() {
      this.changeProfList()
    },
  },
  methods: {
    changeProfList() {
      if (this.selectedDirection !== null ) {
        if (this.selectedDirection?.profiles !== null) {
          this.profiles = this.selectedDirection?.profiles || []
        }
        else {
          this.profiles = []
        }
      }
    },
    updateAdditional() {
      api.updateAdditionalSectorDescription(
        this.selectedSector.id,
        this.selectedProfile.id,
        this.additDescription
    )},
    setAdditional() {
      this.additDescription = this.directions.find((dir) => dir.id === this.selectedDirection.id)?.profiles
        .find((prof) => prof.id === this.selectedProfile.id).additionalDescription || ''
    }
  },
  mounted() {
    this.$root.$on('changeAdditional', () => {
      this.updateAdditional()
    })
  }
}
</script>
<style lang="scss" scoped>
.edit-form {
  display: flex;
  flex-direction: column;
  &__select {
    margin-bottom: 25px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }

  &__label {
  }

  &__textarea {
  }
}

</style>