import axios from "axios";
import store from '../store'

export default {
    async signIn(login, password) {
        return await axios.request({
            url: 'v1/auth/login',
            method: 'POST',
            data: {
                login,
                password
            }
        }).then(resp => {
            if (resp.data.code === 200) {
                store.dispatch('changeIsAuth', true)
                store.dispatch('changeToken', resp.data.token)
            } 
            return resp.data
        }).catch(err => {
            return err
        })
    },
    

}
