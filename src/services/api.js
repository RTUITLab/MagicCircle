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
            console.log('getProfilesFromApi', resp)
            return resp.data.profiles
        }).catch(err => {
            return err
        })
    },
    async getSectorsFromApi(institute = {id:''}, direction = {id:''}, profile = {id:''}) {
        console.log('institute', institute)

        let instituteList = institute.map((item) => { return item.id})
        let profileList = direction.map((item) => { return item.id})
        let directionList = profile.map((item) => { return item.id})
        console.log('instituteList', instituteList)
        console.log('profileList', profileList)
        console.log('directionList', directionList)
          return await axios.request({
              url: 'v1/sector',
              method: 'GET',
              params: { institute: instituteList[0], direction: profileList[0], profile: directionList[0] }
          }).then(resp => {
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
            if (resp.data === 201) {
                alert('Успешно создано!')
            }
            return resp.data
        }).catch(err => {
            alert('Не получилось, проверьте правильность ввденных данных')
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
