import useLocalStorage from '@/useLocalStorage'

const ratingsModule = {
  namespaced: true,
  state: () => ({
    reviews: useLocalStorage([], 'reviews')
  }),
  mutations: {
    ADD_REVIEW(state, review) {
      state.reviews.value.push(review)
    },
    SET_REVIEWS(state, reviews) {
      state.reviews.value = reviews
    }
  },
  actions: {
    fetchReviews({ commit }) {
      const reviews = JSON.parse(window.localStorage.getItem('reviews')) || []
      commit('SET_REVIEWS', reviews)
    },
    submitReview({ commit, state }, review) {
      commit('ADD_REVIEW', review)
      // Update local storage automatically through the useLocalStorage composition function
    }
  },
  getters: {
    reviews: (state) => state.reviews.value,
    averageRating: (state) => {
      if (state.reviews.value.length === 0) return 0
      const total = state.reviews.value.reduce((sum, review) => sum + review.rating, 0)
      return (total / state.reviews.value.length).toFixed(1)
    }
  }
}

export default ratingsModule
