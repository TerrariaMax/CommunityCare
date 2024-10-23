<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Our Services</h1>

        <router-view />

        <h1 class="text-center">🗄️ Review</h1>
        <p class="text-center">Provide your review and rating for the service.</p>

        <div class="form-group mb-3">
          <label for="rating">Rating:</label>
          <Rating v-model="newReview.rating" :cancel="false" :stars="5" />
        </div>

        <form @submit.prevent="submitReview">
          <div class="form-group mb-3">
            <label for="review">Review:</label>
            <textarea
              v-model="newReview.review"
              id="review"
              class="form-control"
              rows="3"
              placeholder="Write your review here"
              :disabled="hasReviewed"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="!isAuthenticated || hasReviewed">
            Submit
          </button>
        </form>

        <div v-if="hasReviewed" class="alert alert-info mt-3 text-center">
          You have already submitted a review.
        </div>

        <div class="mt-4">
          <h3 class="text-center">Average Rating: {{ averageRating }}</h3>
          <h4 class="text-center">Reviews:</h4>
          <ul class="list-group">
            <li v-for="review in reviews" :key="review.id" class="list-group-item">
              <strong>{{ review.fullname }}</strong
              >: {{ review.rating }} Star(s) - {{ review.review }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'
import { getAuth } from 'firebase/auth'
import Rating from 'primevue/rating'

export default {
  components: {
    Rating
  },
  setup() {
    const store = useStore()
    const auth = getAuth()
    const newReview = ref({
      rating: 0,
      review: '',
      fullname: ''
    })
    const reviews = ref([])

    // Load reviews and user details
    const loadReviews = async () => {
      const reviewsSnapshot = await getDocs(collection(db, 'reviews'))
      const reviewsArray = await Promise.all(
        reviewsSnapshot.docs.map(async (doc) => {
          const reviewData = { id: doc.id, ...doc.data() }
          // Fetch user details
          const userSnapshot = await getDocs(collection(db, 'users'))
          const user = userSnapshot.docs.find((userDoc) => userDoc.id === reviewData.userId)
          if (user) {
            reviewData.fullname = user.data().fullname // Assuming 'fullname' exists in the user document
          }
          return reviewData
        })
      )
      return reviewsArray
    }

    onMounted(async () => {
      const reviewsData = await loadReviews()
      store.dispatch('setReviews', reviewsData)
      reviews.value = reviewsData
    })

    const submitReview = async () => {
      if (hasReviewed.value) return

      const user = auth.currentUser
      if (!user) return

      // Set fullname from Firebase Authentication
      newReview.value.fullname = user.fullname || 'Anonymous' // Use displayName or a fallback

      const review = {
        ...newReview.value,
        userId: user.uid
      }

      // Ensure no undefined values are sent to Firestore
      if (!review.fullname || !review.review) {
        console.error('Review data is incomplete.')
        return
      }

      await addDoc(collection(db, 'reviews'), review)
      store.dispatch('addReview', review)
      newReview.value.rating = 0
      newReview.value.review = ''
      newReview.value.fullname = '' // Clear fullname after submission
    }

    const hasReviewed = computed(() => {
      return store.getters.reviews.some((review) => review.userId === auth.currentUser?.uid)
    })

    return {
      newReview,
      submitReview,
      reviews: computed(() => store.getters.reviews),
      averageRating: computed(() => {
        return store.getters.averageRating || 0 // Fetch average rating from store or default to 0
      }),
      isAuthenticated: computed(() => !!auth.currentUser), // Use auth to check if user is authenticated
      hasReviewed
    }
  }
}
</script>
