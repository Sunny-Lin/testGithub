import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null
  },
  mutations: {
    setUserData (state, data) {
      state.userData = data
    }
  },
  actions: {}
})
