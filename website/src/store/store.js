// import { db, auth } from './firebase'

// export default createStore({
//   state: {
//     isAuthenticated: false,
//     user: null,
//     reviews: []
//   },
//   mutations: {
//     setAuthentication(state, status) {
//       state.isAuthenticated = status
//     },
//     setUser(state, user) {
//       state.user = user
//     },
//     setReviews(state, reviews) {
//       state.reviews = reviews
//     },
//     addReview(state, review) {
//       state.reviews.push(review)
//     },
//     clearUser(state) {
//       state.isAuthenticated = false
//       state.user = null
//     },
//     clearReviews(state) {
//       state.reviews = []
//     }
//   },
//   actions: {
//     // Fetch reviews from Firebase Firestore
//     async loadReviews({ commit }) {
//       try {
//         const snapshot = await db.collection('reviews').get()
//         const reviews = snapshot.docs.map(doc => doc.data())
//         commit('setReviews', reviews)
//       } catch (error) {
//         console.error('Error loading reviews:', error)
//       }
//     },

//     // Save reviews to Firestore when a new review is added
//     async addReview({ commit }, review) {
//       try {
//         await db.collection('reviews').add(review)
//         commit('addReview', review)
//       } catch (error) {
//         console.error('Error adding review:', error)
//       }
//     },

//     // Login with Firebase Authentication
//     async login({ commit }, { email, password }) {
//       try {
//         const userCredential = await auth.signInWithEmailAndPassword(email, password)
//         const user = userCredential.user
//         commit('setAuthentication', true)
//         commit('setUser', { uid: user.uid, email: user.email })
//       } catch (error) {
//         console.error('Error during login:', error)
//       }
//     },

//     // Logout from Firebase Authentication
//     async logout({ commit }) {
//       try {
//         await auth.signOut()
//         commit('setAuthentication', false)
//         commit('setUser', null)
//       } catch (error) {
//         console.error('Error during logout:', error)
//       }
//     },

//     // Clear reviews (optional: clear from Firestore if necessary)
//     async clearReviews({ commit }) {
//       commit('clearReviews')
//       // Optionally clear all reviews from Firestore (if this is part of your logic)
//       // const reviewsSnapshot = await db.collection('reviews').get()
//       // reviewsSnapshot.forEach(async (doc) => {
//       //   await db.collection('reviews').doc(doc.id).delete()
//       // })
//     }
//   },
//   getters: {
//     userRole: (state) => (state.user ? state.user.role : null),
//     username: (state) => (state.user ? state.user.email : 'Guest'), // Example for email
//     reviews: (state) => state.reviews,
//     averageRating: (state) => {
//       const reviews = state.reviews
//       if (reviews.length === 0) return 0
//       const total = reviews.reduce((sum, review) => sum + review.rating, 0)
//       return (total / reviews.length).toFixed(1)
//     }
//   }
// })

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
