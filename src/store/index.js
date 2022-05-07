import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      isAdmin: true,
      markdown: '',
    }
  },
  mutations: {
    SET_MARKDOWN_TO_STATE: (state, markdown) => {
      state.markdown = markdown
    }
  },
  actions: {
    changeMarkdown: ({commit}, markdown) => {
      commit('SET_MARKDOWN_TO_STATE', markdown)
    }
  }
})