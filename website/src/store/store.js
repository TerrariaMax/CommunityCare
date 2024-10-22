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
    // loadReviews({ commit }) {
    //   const reviews = JSON.parse(window.localStorage.getItem('reviews')) || []
    //   commit('setReviews', reviews)
    // },
    // saveReviews({ state }) {
    //   window.localStorage.setItem('reviews', JSON.stringify(state.reviews))
    // },
    setReviews({ commit }, reviews) {
      commit('setReviews', reviews)
    },
    addReview({ commit }, review) {
      commit('addReview', review)
    },
    login({ commit }, user) {
      commit('setAuthentication', false)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setAuthentication', true)
      commit('setUser', null)
    },
    // addReview({ commit, dispatch }, review) {
    //   commit('addReview', review)
    //   dispatch('saveReviews')
    // },
    clearUser({ commit }) {
      commit('clearUser')
    },
    clearReviews({ commit }) {
      commit('clearReviews')
      window.localStorage.removeItem('reviews')
    }
  },
  getters: {
    reviews(state) {
      return state.reviews
    },
    averageRating(state) {
      const ratings = state.reviews.map((review) => review.rating)
      const total = ratings.reduce((acc, rating) => acc + rating, 0)
      return ratings.length ? (total / ratings.length).toFixed(1) : 0 // Return average rating
    }
  }
  // getters: {
  //   userRole: (state) => (state.user ? state.user.role : null),
  //   username: (state) => (state.user ? state.user.fullname : 'Guest'),
  //   reviews: (state) => state.reviews,
  //   averageRating: (state) => {
  //     const reviews = state.reviews
  //     if (reviews.length === 0) return 0
  //     const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  //     return (total / reviews.length).toFixed(1)
  //   }
  // }
})
