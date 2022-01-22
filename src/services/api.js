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
    async getSectorsFromApi(institute = {name:''}, direction = {name:''}, profile = {name:''}) {
        console.log('getSectorsFromApi', institute, direction, profile)
        let instituteList = institute.map((item) => { return item.name})
        let profileList = direction.map((item) => { return item.name})
        let directionList = profile.map((item) => { return item.name})
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
            url: 'v1/adjacenttables',
            method: 'POST',
            data: data
        }).then(resp => {
            return resp.data
        }).catch(err => {
            return err
        })
    },
    async deleteInstituteFromApi(id) {
        return await axios.request({
            url: 'v1/institute/' + id,
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
