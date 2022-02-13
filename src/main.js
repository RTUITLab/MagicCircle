import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue'
import router from './router'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style/style.css'
Vue.config.productionTip = false
import axios from "axios";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)

Vue.use(VueRouter)
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL || window.location.origin + "/api/magic-circle/"

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
