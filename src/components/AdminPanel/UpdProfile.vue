<template>
  <div>
    <form class="update-form" @submit="test">
      <h3> Обновить</h3>
      <multiselect class="selects-row__item inst" v-model="selectInst" tag-placeholder="Выберите институт"
                   placeholder="Выберите институт" label="name" track-by="id" :options="instituteList"
                   />
      <b-form-input v-model="instName" placeholder="Введите новое название института" required/>
      <button type="submit" class="btn btn-success">Добавить</button>
    </form>
  </div>
</template>

<script>
import api from "../../services/api";

export default {
  name: "UpdProfile",
  data() {
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

.add-form {
  input {
    margin-bottom: 10px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    min-height: 40px;
    display: block;
    padding: 8px 40px 8px 8px;
    border-radius: 5px;
    line-height: normal;

    &:disabled {
      background: #fff;
      pointer-events: none;
      opacity: .6;
    }

    &::placeholder {
      color: #adadad;
    }

  }

  margin-bottom: 30px;
}
</style>
