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
    //TODO default value for params
    async getSectorsFromApi(institute, direction, profile) {
        console.log('getSectorsFromApi', institute.name, direction.name, profile.name)
          return await axios.request({
              url: 'v1/sector',
              method: 'GET',
              params: { institute: institute.name, direction: direction.name, profile: profile.name }
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
            return resp.data
        }).catch(err => {
            return err
        })
    },


}
