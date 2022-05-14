import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import Notifications from 'vue-notification'

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
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL || window.location.origin

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
