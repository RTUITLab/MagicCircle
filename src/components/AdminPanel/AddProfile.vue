<template>
  <div class="add-section">
    <div class="add-form">
      <h3> Добавить институт</h3>
      <b-form-input v-model="instName" placeholder="Введите название института" required/>
      <button type="submit" @click="addInst(instName)" class="btn btn-success">Добавить</button>
    </div>
    <div class="add-form">
      <h3> Добавить направление</h3>
      <multiselect class="multiselect" v-model="selectInstOfDirs"  tag-placeholder="Выберите институт" placeholder="Выберите институт" label="name" track-by="id" :options="instituteList" ></multiselect>
      <b-form-input v-model="directName" placeholder="Введите название направления" required/>
      <button type="submit" @click="addDir(directName)" class="btn btn-success">Добавить</button>
    </div>
    <div class="add-form">
      <h3> Добавить профиль</h3>
      <multiselect class="multiselect" v-model="selectInstOfProfs"  tag-placeholder="Выберите институт" placeholder="Выберите институт" label="name" track-by="id" :options="instituteList" ></multiselect>
      <multiselect class="multiselect" :disabled="selectInstOfProfs === '' || selectInstOfProfs === null"  v-model="selectDir"  tag-placeholder="Выберите направление" placeholder="Выберите направление" label="name" track-by="id" :options="directionList" ></multiselect>
      <b-form-input :disabled="selectDir === '' || selectDir === null" v-model="profName" placeholder="Введите название профиля" required/>
      <button type="submit" @click="addProf(profName)" class="btn btn-success">Добавить</button>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: "AddProfile",
  data () {
    return {
      selectInstOfDirs: '',
      selectInstOfProfs: '',
      selectDir: '',
      instituteList: [],
      directionList: [],
      allDirections: [],
      instName: '',
      directName: '',
      profName: '',
    }
  },
  watch: {
    selectInstOfDirs: function (selectInst) {
      console.log('WATCH selectInstOfDirs', selectInst)
      this.changeDirsList()
    },
    selectInstOfProfs: function (selectInst) {
      console.log('WATCH selectInstOfProfs', selectInst)
      this.changeDirsList()
    },
  },
  methods: {
    changeDirsList() {
      if (this.selectInstOfProfs !== null && this.selectInstOfProfs.directions !== null) {
        this.directionList = this.selectInstOfProfs.directions
        console.log('TESTsad')
      }
      else {
        console.log('else')
        this.directionList = this.allDirections
      }
    },
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
        this.allDirections = (data === null) ? [] : data
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
    addInst(instName) {
      const data = {
        institute: {
          name: instName
        }
      }
      api.postSectorsToApi(data)
    },
    addDir(directName) {
      const data = {
        direction: {
          name: directName
        },
        institute: {
          id: this.selectInstOfDirs.id,
          name: this.selectInstOfDirs.name
        }
      }
      api.postSectorsToApi(data)
    },
    addProf(profName) {
      const data = {
        direction: {
            id: this.selectDir.id,
            name: this.selectDir.name
        },
        institute: {
          id: this.selectInstOfProfs.id,
          name: this.selectInstOfProfs.name
        },
        profile: {
          name: profName
        }
      }
      api.postSectorsToApi(data)
    }
  },
  mounted() {
    this.getAllDataFromApi()
  }
}
</script>

<style scoped lang="scss">
.multiselect {
  margin-bottom: 10px;
}
.add-form{
  input {
    margin-bottom: 10px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    min-height: 40px;
    display: block;
    padding: 8px 40px 8px 8px;
    border-radius: 5px;
    line-height: normal;
    &:disabled{
      background: #fff;
      pointer-events: none;
      opacity: .6;
    }
    &::placeholder{
      color: #adadad;
    }

  }
  margin-bottom: 30px;
}
</style>
