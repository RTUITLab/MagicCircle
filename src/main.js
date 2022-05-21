import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import Notifications from 'vue-notification'

import apiAuth from './services/apiAuth'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/style/style.scss'
import './assets/style/_multiselect.scss'
import axios from "axios";
// Make BootstrapVue available throughout your project
Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
Vue.use(ModalPlugin)

Vue.use(Notifications)

Vue.use(VueRouter)

let isRefresh = null;
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL || window.location.origin
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !isRefresh) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${(localStorage.getItem('token'))}`;

          isRefresh = true;
          try {
            await apiAuth.refreshToken()
            return ;
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
