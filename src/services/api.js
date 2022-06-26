import axios from "axios";
import store from '../store'
import Vue from 'vue'


export default {
    async getDirectionsFromApi() {
        return await axios.request({
            url: 'api/magic-circle/v1/direction',
            method: 'GET'
        }).then(resp => {
            return resp.data.directions
        }).catch(err => {
            return err
        })
    },
    async getInstitutesFromApi() {
        return await axios.request({
            url: 'api/magic-circle/v1/institute',
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
            url: 'api/magic-circle/v1/profile',
            method: 'GET'
        }).then(resp => {
            return resp.data.profiles
        }).catch(err => {
            return err
        })
    },

    async postSectorsToApi(data) {
        
        return await axios.request({
            url: 'api/magic-circle/v1',
            method: 'POST',
            data: data
        }).then(resp => {
            Vue.notify({
                type: 'success',
                text: 'Успешно создано!'
            })
            return resp.data
        }).catch(err => {
            if (err.response.status === 404) {
                this.postNewSectorToApi(data.sectors.coords, data)
            } else {
                Vue.notify({
                    type: 'error',
                    text: 'Не получилось, проверьте правильность ввденных данных'
                })
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
            url: 'api/magic-circle/v1/sectors',
            method: 'POST',
            data: data
        }).then(resp => {
            this.postSectorsToApi(dataLastRequest)
            return resp.data
        }).catch(err => {
            console.log('404', err.response.status, idSectors)
            Vue.notify({
                type: 'error',
                text: 'Не получилось, проверьте правильность ввденных данных'
            })
            console.log(err)
            return err
        })
    },
    async deleteInstituteFromApi(id) {
        return await axios.request({
            url: 'api/magic-circle/v1/institute/' + id,
            method: 'DELETE',
        }).then(resp => {
            if (resp.status === 200) {
                this.getInstitutesFromApi()
            }
            return resp.data
        }).catch(err => {
            Vue.notify({
                type: 'error',
                text: 'Невозможно удалить институт. Проверьте привязаны ли к нему направления'
            })
            return err
        })
    },
    async deleteDirectionFromApi(id) {
        return await axios.request({
            url: 'api/magic-circle/v1/direction/' + id,
            method: 'DELETE',
        }).then(resp => {
            if (resp.status === 200) {
                this.getInstitutesFromApi()
            }
            return resp.data
        }).catch(err => {
            Vue.notify({
                type: 'error',
                text: 'Невозможно удалить направление. Проверьте привязаны ли к нему профили'
            })
            return err
        })
    },
    async deleteProfileFromApi(id) {
        return await axios.request({
            url: 'api/magic-circle/v1/profile/' + id,
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

    /* 
    * Admin api
    */
    async addAdminToApi(instituteId, login, password) {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/admin/' + instituteId,
            method: 'POST',
            data: {
                login,
                password
            }
        }).then(resp => {
            return resp
        }).catch(err => {
            return err.response
        })
    },

    async addSuperAdminToApi(login, password) {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/superadmin',
            method: 'POST',
            data: {
                login,
                password
            }
        }).then(resp => {
            return resp
        }).catch(err => {
            return err.response
        })
    },
    async getAdmins() {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/admin',
            method: 'GET',
        }).then(async resp => {
            store.dispatch('changeAdminList', resp.data.admins)
            return resp
        }).catch(err => {
            console.log('err', err);
            return err.response
        })
    },
    async getSuperAdmins() {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/superadmin',
            method: 'GET',
        }).then(resp => {
            store.dispatch('changeSuperAdminList', resp.data.admins)
            return resp
        }).catch(err => {
            console.log('err', err);
            return err.response
        })
    },
    async deleteAdmin(adminId) {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/admin/' + adminId,
            method: 'DELETE',
        }).then(resp => {
            this.getAdmins();
            return resp
        }).catch(err => {
            console.log('err', err);
            return err.response
        })
    },
    async deleteSuperAdmin(superAdminId) {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/superadmin/' + superAdminId,
            method: 'DELETE',
        }).then(resp => {
            this.getSuperAdmins();
            return resp
        }).catch(err => {
            return err.response
        })
    },

    /* 
    * Sector Api 
    */
    async getSectorsList() {
        return await axios.request({
            url: 'api/magic-circle/v1/sectorIds',
            method: 'GET',
        }).then(resp => {
            store.dispatch('fetchSectors', resp.data.sectors)
            return resp.data
        }).catch(err => {
            return err
        })
    },
    // async getSectorsFromApi(institute = {id: ''}, direction = {id: ''}, profile = {id: ''}) {
    async getSectorsFromApi(institutes, directions, profiles) {
        let formatInstitutes = '';
        let formatDirections = '';
        let formatProfiles = '';
        institutes.forEach( inst => formatInstitutes = formatInstitutes + `${inst.id} `),
        directions.forEach( dir => formatDirections = formatDirections + `${dir.id} `),
        profiles.forEach( prof => formatProfiles = formatProfiles + `${prof.id} `)
        return await axios.request({
            url: 'api/magic-circle/v1/sectorIds',
            method: 'GET',
            params: {
                institute: formatInstitutes?.slice(0, -1),
                direction: formatDirections?.slice(0, -1),
                profile: formatProfiles?.slice(0, -1)
            }
        }).then(resp => {
            return resp.data
        }).catch(err => {
            return err
        })
    },
    async updateSectorDescription(sectorId, description) {
        return await axios.request({
            url: 'api/magic-circle/v1/sector/' + sectorId,
            method: 'PUT',
            data: {
                description
            }
        }).then(resp => {
            this.getSectorsList();
            Vue.notify({
                type: 'success',
                text: 'Успешно!'
            })
            return resp
        }).catch(err => {
            Vue.notify({
                type: 'error',
                text: `${err}`
            })
            return err.response
        })
    },

    async updateAdditionalSectorDescription(sectorId, profileId, additionalDescription) {
        return await axios.request({
            url: `api/magic-circle/v1/sector/${sectorId}/profile/${profileId}`,
            method: 'PUT',
            data: {
                additionalDescription
            }
        }).then(resp => {
            this.getSectorsList();
            Vue.notify({
                type: 'success',
                text: 'Успешно!'
            })
            return resp
        }).catch(err => {
            Vue.notify({
                type: 'error',
                text: `${err}`
            })
            return err.response
        })
    },

    async getSector(sectorId) {
        return await axios.request({
            url: `api/magic-circle/v1/sector/${sectorId}`,
            method: 'GET',
        }).then(resp => {
          console.log('resp', resp);
          store.dispatch('changeselectedSector', resp.data)
            return resp.data
        }).catch(err => {
            return err
        })
    }

}
