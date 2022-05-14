import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state () {
    return {
      isAdmin: true,
      markdown: '',
      institutes: [],

      isAuth: false,
      user: null,
      token: '',

      adminList: [],
      superAdminList: [],
    }
  },
  mutations: {
    SET_INSTITUTES_TO_STATE: (state, institutes) => {
      state.institutes = institutes
    },
    SET_MARKDOWN_TO_STATE: (state, markdown) => {
      state.markdown = markdown
    },

    // Auth
    SET_AUTH_TO_STATE: (state, value) => {
      state.isAuth = value
    },
    SET_USER_TO_STATE: (state, user) => {
      state.user = user
    },
    SET_TOKEN_TO_STATE: (state, token) => {
      state.token = token
    },

    // Admins
    SET_ADMINS_TO_STATE: (state, adminList) => {
      state.adminList = adminList
    },
    SET_SUPERADMINS_TO_STATE: (state, superAdminList) => {
      state.superAdminList = superAdminList
    },
  },
  actions: {
    changeMarkdown: ({commit}, markdown) => {
      commit('SET_MARKDOWN_TO_STATE', markdown)
    },
    changeInstitutes: ({commit}, institutes) => {
      commit('SET_INSTITUTES_TO_STATE', institutes)
    },

    // Auth
    changeIsAuth: ({commit}, isAuth) => {
      commit('SET_AUTH_TO_STATE', isAuth)
    },
    changeUser: ({commit}, user) => {
      commit('SET_USER_TO_STATE', user)
    },
    changeToken: ({commit}, token) => {
      commit('SET_TOKEN_TO_STATE', token)
    },
    signOut: ({commit}) => {
      commit('SET_TOKEN_TO_STATE', null)
      commit('SET_USER_TO_STATE', null)
      commit('SET_AUTH_TO_STATE', null)
    },

    // Admins
    changeAdminList: ({commit}, adminList) => {
      commit('SET_ADMINS_TO_STATE', adminList)
    },
    changeSuperAdminList: ({commit}, superAdminList) => {
      commit('SET_SUPERADMINS_TO_STATE', superAdminList)
    },
  }
})