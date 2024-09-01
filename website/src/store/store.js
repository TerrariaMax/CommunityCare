import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    reviews: []
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    setUser(state, user) {
      state.user = user
    },
    setReviews(state, reviews) {
      state.reviews = reviews
    },
    addReview(state, review) {
      state.reviews.push(review)
    },
    clearUser(state) {
      state.isAuthenticated = false
      state.user = null
    },
    clearReviews(state) {
      state.reviews = []
    }
  },
  actions: {
    loadReviews({ commit }) {
      const reviews = JSON.parse(window.localStorage.getItem('reviews')) || []
      commit('setReviews', reviews)
    },
    saveReviews({ state }) {
      window.localStorage.setItem('reviews', JSON.stringify(state.reviews))
    },
    login({ commit }, user) {
      commit('setAuthentication', true)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setAuthentication', false)
      commit('setUser', null)
    },
    addReview({ commit, dispatch }, review) {
      commit('addReview', review)
      dispatch('saveReviews')
    },
    clearUser({ commit }) {
      commit('clearUser')
    },
    clearReviews({ commit }) {
      commit('clearReviews')
      window.localStorage.removeItem('reviews')
    }
  },
  getters: {
    userRole: (state) => (state.user ? state.user.role : null),
    username: (state) => (state.user ? state.user.fullname : 'Guest'),
    reviews: (state) => state.reviews,
    averageRating: (state) => {
      const reviews = state.reviews
      if (reviews.length === 0) return 0
      const total = reviews.reduce((sum, review) => sum + review.rating, 0)
      return (total / reviews.length).toFixed(1)
    }
  }
})
