<template>
  <div class="del-section" >
    <div class="del-form">
      <h3> Удалить институт</h3>
      <multiselect class="selects-row__item inst" v-model="delValueInst"  tag-placeholder="Выберите институт" placeholder="Выберите институт" label="name" track-by="id" :options="instituteList" :taggable="true"></multiselect>
      <button type="submit" @click="delInstitute" class="btn btn-danger">Удалить</button>
    </div>
    <div class="del-form">
      <h3> Удалить направление</h3>
      <multiselect class="selects-row__item dirs" v-model="delValueDirect" tag-placeholder="Выберите направление" placeholder="Выберите направление" label="name" track-by="id" :options="directionList" :taggable="true"></multiselect>
      <button type="submit" @click="delDirection" class="btn btn-danger">Удалить</button>
    </div>
    <div class="del-form">
      <h3> Удалить профиль</h3>
      <multiselect class="selects-row__item profs" v-model="delValueProfile" tag-placeholder="Выберите профиль" placeholder="Выберите профиль" label="name" track-by="id" :options="profileList" :taggable="true" ></multiselect>
      <button type="submit" @click="delProfile" class="btn btn-danger">Удалить</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "DelPage",
  data () {
    return {
      delValueInst: '',
      delValueProfile: '',
      delValueDirect: '',
      sectorList: [],
      instituteList: [],
      directionList: [],
      profileList: []
    }
  },
  methods: {
    delDirection() {
      console.log('delDirection', this.delValueDirect.id)
      api.deleteDirectionFromApi(this.delValueDirect.id)
    },
    delInstitute() {
      console.log('delInstitute', this.delValueInst.id)
      api.deleteInstituteFromApi(this.delValueInst.id)
      // this.instituteList.find(item => {
      //   if (item.id === this.delValueInst.id){
      //     console.log('TITEM', item)
      //     this.instituteList.indexOf(item, 1)
      //     console.log('delInstitute', this.instituteList)
      //   }
      // })
      console.log('this institute after delete', this.instituteList)
    },
    delProfile() {
      console.log('delProfile', this.delValueProfile.id)
      api.deleteProfileFromApi(this.delValueProfile.id)
    },
    getAllDataFromApi() {
      // get institutes
      api.getInstitutesFromApi().then(data => {
        console.log('data ', data)
        this.instituteList = data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })

      // get directions
      api.getDirectionsFromApi().then(data => {
        console.log('data ', data)
        this.directionList = data
      }).catch(err => {
        alert('Ошибка', err)
        console.log('err', err)
      })


      // get profiles
      api.getProfilesFromApi().then(data => {
        console.log('data ', data)
        this.profileList = data
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

<style scoped>
.form-control{
  margin-bottom: 15px;
}

.del-form {
  margin-bottom: 30px;
}

.selects-row__item {
  margin-bottom: 10px;
}
</style>
