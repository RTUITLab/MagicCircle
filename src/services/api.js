import axios from "axios";
import store from '../store'

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
            store.dispatch('changeInstitutes', resp.data.institutes)
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
    // async getSectorsFromApi(institute = {id: ''}, direction = {id: ''}, profile = {id: ''}) {
    async getSectorsFromApi(institutes, directions, profiles) {
        return await axios.request({
            url: 'v1/sector',
            method: 'GET',
            params: {institute: institutes[0]?.id, direction: directions[0]?.id, profile: profiles[0]?.id}
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
            alert('Успешно создано!')
            return resp.data
        }).catch(err => {
            if (err.response.status === 404) {
                console.log('404', err.response.status, data.sectors.coords[0])
                this.postNewSectorToApi(data.sectors.coords, data)
            } else {
                alert('Не получилось, проверьте правильность ввденных данных')
            }
            console.log(err)
            return err
        })
    },
    async postNewSectorToApi(idSectors, dataLastRequest) {
        let data = []
        idSectors.forEach(elem => {
            data.push({
                "coords": elem,
                "description": "empty"
            })
        })
        return await axios.request({
            url: 'v1/sectors',
            method: 'POST',
            data: data
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
                this.getInstitutesFromApi()
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
                this.getInstitutesFromApi()
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
                this.getInstitutesFromApi()
            }
            return resp.data
        }).catch(err => {
            return err
        })
    },

}
