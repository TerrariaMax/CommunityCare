import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    user: null
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    signUp({ commit }, user) {
      commit('setUser', user)
    },
    login({ commit }, user) {
      commit('setAuthentication', true)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setUser', null)
    }
  }
})
