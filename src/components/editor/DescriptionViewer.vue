<template>
  <div>
      <div class="accordion" role="tablist" v-for="inst in institutes" :key="inst.id">
          <div block v-b-toggle="`accordion-inst${inst.id}`" class="accordion-item">
            <span>{{inst.name}}</span>
          </div>
          <b-collapse v-if="inst.directions" :id="`accordion-inst${inst.id}`" role="tabpanel">
              <div v-for="dir in inst.directions" :key="dir.id">
                <div block v-b-toggle="`accordion-dir${dir.id}`" class="accordion-item accordion-subitem" >
                  <span>{{dir.name}}</span>
                </div>
                <b-collapse v-if="dir.profiles" :id="`accordion-dir${dir.id}`" role="tabpanel">
                    <div no-body v-for="prof in dir.profiles" :key="prof.id" >
                        <div block v-b-toggle="`accordion-prof${prof.id}`" class="accordion-item accordion-sub-subitem">
                          <div class="profile-description">
                            <span class="profile-description__header">{{prof.name}}</span>
                            <span class="profile-description__body"> {{prof}}</span>
                          </div>
                        </div>
                    </div>
                </b-collapse>
              </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  props: {
    additionalDescription: Array
  },
  data() {
    return {

    }
  },
  computed: {
    institutes () {
        return this.$store.state.institutes
    },
    selectedSectorCode() {
      return this.$store.state.sectorList.find((sector) => 
        sector.coords ===this.$store.state.selectedSectorCode)
    }
  },
  methods: {
    getAllDataFromApi() {
      // get institutes
      api.getInstitutesFromApi().then(data => {
        this.instituteList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get directions
      api.getDirectionsFromApi().then(data => {
        this.directionList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })


      // get profiles
      api.getProfilesFromApi().then(data => {
        this.profileList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })
    },
    getAdditionalDescription() {
      return this.$store.state.sectorList.find((sector) => 
        sector.coords === this.selectedSectorCode
        )
    }
  },
  mounted() {
    this.getAllDataFromApi()
  }
}
</script>
<style lang="scss" scoped>
.profile-description {
  display: flex;
  flex-direction: column;
  &__header {
    color: var(--color-darkblue);
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 10px;
  }
  &__body {
    color: #5A607F;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }
}
</style>