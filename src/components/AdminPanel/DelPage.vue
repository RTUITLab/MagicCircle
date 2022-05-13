<template>
  <div class="del-section" >
    <div class="del-section__header">
      Институты
    </div>
    <!-- Modals -->
    <b-modal id="modal-del-inst" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteInstitute()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить институт {{selectedInstitute ? selectedInstitute.name : null}}?</div>
    </b-modal>
    <b-modal id="modal-del-direction" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteDirection()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить направление {{selectedDirection ? selectedDirection.name : null}}?</div>
    </b-modal>
    <b-modal id="modal-del-profile" 
            size="xl"
            cancel-title="Отмена"
            header-class="header-preview"
            centered
            content-class="modal-delete"
            ok-title="Удалить"
            @ok="deleteProfile()"
          >
          <div class="delete-modal-body"> Вы действительно хотите удалить профиль {{selectedProfile ? selectedProfile.name : null}}?</div>
    </b-modal>
    <!-- Accordion -->
    <div class="accordion" role="tablist" v-for="inst in instituteList" :key="inst.id">
        <div block v-b-toggle="`accordion-inst${inst.id}`" class="accordion-item">
          <span>{{inst.name}}</span>
          <span v-b-modal="'modal-del-inst'" @click="selectedInstitute=inst" class="accordion-delete-label"> <img src="@/assets/delete.svg"  style="margin-right: 12px"> Удалить</span>
        </div>
        <b-collapse v-if="inst.directions" :id="`accordion-inst${inst.id}`" role="tabpanel">
            <div v-for="dir in inst.directions" :key="dir.id">
              <div block v-b-toggle="`accordion-dir${dir.id}`" class="accordion-item accordion-subitem" >
                <span>{{dir.name}}</span>
                <span v-b-modal="'modal-del-direction'" @click="selectedDirection=dir" class="accordion-delete-label"> <img src="@/assets/delete.svg" style="margin-right: 12px"> Удалить</span>
              </div>
              <b-collapse v-if="dir.profiles" :id="`accordion-dir${dir.id}`" role="tabpanel">
                  <div no-body v-for="prof in dir.profiles" :key="prof.id" >
                      <div block v-b-toggle="`accordion-prof${prof.id}`" class="accordion-item accordion-sub-subitem">
                        <span>{{prof.name}}</span>
                        <span v-b-modal="'modal-del-profile'" @click="selectedProfile=prof" class="accordion-delete-label"> <img src="@/assets/delete.svg"  style="margin-right: 12px"> Удалить</span>
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
  name: "DelPage",
  data () {
    return {
      delValueInst: '',
      delValueProfile: '',
      delValueDirect: '',

      selectedInstitute: null,
      selectedDirection: null,
      selectedProfile: null,

      sectorList: [],

      instituteList: [],
      directionList: [],
      profileList: []

    }
  },
  methods: {
    deleteInstitute() {
      api.deleteInstituteFromApi(this.selectedInstitute.id)
      this.instituteList.find(item => {
        if (item.id === this.selectedInstitute.id){
          this.instituteList.indexOf(item, 1)
        }
      })
      console.log('this institute after delete', this.instituteList)
    },
    deleteDirection() {
      api.deleteDirectionFromApi(this.selectedDirection.id)
      this.directionList.find(item => {
        if (item.id === this.selectedDirection.id){
          this.directionList.indexOf(item, 1)
        }
      })
    },
    deleteProfile() {
      api.deleteProfileFromApi(this.selectedProfile.id)
      this.profileList.find(item => {
        if (item.id === this.selectedProfile.id){
          this.profileList.indexOf(item, 1)
        }
      })
    },
    getAllDataFromApi() {
      // get institutes
      api.getInstitutesFromApi().then(data => {
        console.log('data ', data)
        this.instituteList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get directions
      api.getDirectionsFromApi().then(data => {
        console.log('data ', data)
        this.directionList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })


      // get profiles
      api.getProfilesFromApi().then(data => {
        console.log('data ', data)
        this.profileList = (data === null) ? [] : data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })
    },
  },
  mounted() {
    this.getAllDataFromApi()
  }
}
</script>

<style scoped lang="scss">
.form-control{
  margin-bottom: 15px;
}
.del-section {
  &__header {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    text-align: center;
    padding: 20px;
  }
}
.del-form {
  margin-bottom: 30px;
}

.selects-row__item {
  margin-bottom: 10px;
}

.delete-modal-body {
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
}
.accordion-item {
  display: flex;
  justify-content: space-between;
  padding: 25px 35px;
  background: #fcfcfc;
  font-size: 18px;
  line-height: 28px;
  border: none;
  &:hover {
    background-color: #f5f4ff;
  }
}
.accordion-item.not-collapsed {
    background:#F5F6FA;
    border-bottom: 1px solid #D7DBEC;
  }
.accordion-subitem {
  padding-left: 50px;
}

.accordion-sub-subitem {
  padding-left: 75px;
}

.accordion-delete-label {
  color: #F12B43;
  display: flex;
  align-items: self-start;
}
</style>
