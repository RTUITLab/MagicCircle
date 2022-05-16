import axios from "axios";
import store from '../store'

export default {
    async signIn(login, password) {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/login',
            method: 'POST',
            data: {
                login,
                password
            }
        }).then(async (resp) => {
            if (resp.data.code === 200) {
                await store.dispatch('changeIsAuth', true)
                await localStorage.setItem('token', resp.data.token)
                await store.dispatch('changeToken', resp.data.token)
            } 
            return resp.data
        }).catch(err => {
            return err
        })
    },
    async refreshToken() {
        return await axios.request({
            url: 'api/magic-circle/v1/auth/refreshToken',
            method: 'GET',
        }).then(async (resp) => {
            if (resp.data.code === 200) {
                await store.dispatch('changeIsAuth', true)
                await localStorage.setItem('token', resp.data.token)
                await store.dispatch('changeToken', resp.data.token)
            } 
            return resp.data
        }).catch(err => {
            return err
        })
    },
    

}
