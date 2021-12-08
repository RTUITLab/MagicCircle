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
    async getSectorsFromApi() {
          return await axios.request({
              url: 'v1/sector',
              method: 'GET',
              params: { institute: '', direction: '', profile: '' }
          }).then(resp => {
              return resp.data
          }).catch(err => {
              return err
          })
    },


}
