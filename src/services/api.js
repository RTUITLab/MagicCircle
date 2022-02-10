import axios from "axios";

export default {
      async getDirectionsFromApi() {
           return await axios.request({
            url: 'v1/direction',
            method: 'GET'
        }).then(resp => {
            return resp.data.directions
        }).catch(err => {
             return err
        })
    },
    async getInstitutesFromApi() {
        return await axios.request({
            url: 'v1/institute',
            method: 'GET'
        }).then(resp => {
            return resp.data.institutes
        }).catch(err => {
            return err
        })
    },
    async getProfilesFromApi() {
        return await axios.request({
            url: 'v1/profile',
            method: 'GET'
        }).then(resp => {
            return resp.data.profiles
        }).catch(err => {
            return err
        })
    },
    async getSectorsFromApi(institute = {id:''}, direction = {id:''}, profile = {id:''}) {
          return await axios.request({
              url: 'v1/sector',
              method: 'GET',
              params: { institute: institute.id, direction: direction.id, profile: profile.id }
          }).then(resp => {
              console.log('getSectorsFromApi ', institute)
              return resp.data
          }).catch(err => {
              return err
          })
    },
    async postSectorsToApi(data) {
        return await axios.request({
            url: 'v1',
            method: 'POST',
            data: data
        }).then(resp => {
            console.log('postSectorsToApi ', resp)
            alert('Успешно создано!')
            return resp.data
        }).catch(err => {
            if (err.response.status === 404){
                console.log('404', err.response.status, data.sectors.coords[0])
                this.postNewSectorToApi(data.sectors.coords[0], data)
            }
            else {
                alert('Не получилось, проверьте правильность ввденных данных')
            }
            console.log(err)
            return err
        })
    },
    async postNewSectorToApi(idSectors, dataLastRequest) {
        return await axios.request({
            url: 'v1/sector',
            method: 'POST',
            data: {
                "coords": idSectors
            }
        }).then(resp => {
            console.log('postNewSectorToApi ', resp)
            this.postSectorsToApi(dataLastRequest)
            return resp.data
        }).catch(err => {
            console.log('404', err.response.status, idSectors)
            alert('Не получилось, проверьте правильность ввденных данных')
            console.log(err)
            return err
        })
    },
    async deleteInstituteFromApi(id) {
        return await axios.request({
            url: 'v1/institute/' + id,
            method: 'DELETE',
        }).then(resp => {
            console.log('then')
            if (resp.status === 200) {
                alert('Запись успешно удалена')
            }
            return resp.data
        }).catch(err => {
            alert('Невозможно удалить институт. Проверьте привязаны ли к нему направления')
            return err
        })
    },
    async deleteDirectionFromApi(id) {
        return await axios.request({
            url: 'v1/direction/' + id,
            method: 'DELETE',
        }).then(resp => {
            if (resp.status === 200) {
                alert('Запись успешно удалена')
            }
            return resp.data
        }).catch(err => {
            alert('Невозможно удалить институт. Проверьте привязаны ли к нему профили')
            return err
        })
    },
    async deleteProfileFromApi(id) {
        return await axios.request({
            url: 'v1/profile/' + id,
            method: 'DELETE',
        }).then(resp => {
            if (resp.status === 200) {
                alert('Запись успешно удалена')
            }
            return resp.data
        }).catch(err => {
            return err
        })
    },

}
