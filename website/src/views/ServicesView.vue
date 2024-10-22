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
      fullname: '' // Add fullname field
    })

    // Load reviews and average rating
    const loadReviews = async () => {
      const reviewsSnapshot = await getDocs(collection(db, 'reviews'))
      const reviewsArray = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      return reviewsArray
    }

    onMounted(async () => {
      const reviews = await loadReviews()
      store.dispatch('setReviews', reviews)
    })

    const submitReview = async () => {
      if (hasReviewed.value) return

      const user = auth.currentUser
      if (!user) return

      const review = {
        ...newReview.value,
        fullname: user.displayName,
        userId: user.uid
      }

      await addDoc(collection(db, 'reviews'), review)
      store.dispatch('addReview', review)
      newReview.value.rating = 0
      newReview.value.review = ''
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

<!-- <template>
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

          <button
            type="submit"
            class="btn btn-primary"
            :class="{ 'btn-secondary': !isAuthenticated || hasReviewed }"
            :disabled="!isAuthenticated || hasReviewed"
          >
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
              <strong>{{ review.username }}</strong
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
import Rating from 'primevue/rating'

export default {
  components: {
    Rating
  },
  setup() {
    const store = useStore()
    const newReview = ref({
      rating: 0,
      review: ''
    })

    onMounted(() => {
      store.dispatch('loadReviews')
    })

    const submitReview = () => {
      // Prevent user from submitting multiple reviews
      if (hasReviewed.value) return

      const review = {
        ...newReview.value,
        username: store.getters.username,
        id: Date.now()
      }
      store.dispatch('addReview', review)
      newReview.value.rating = 0
      newReview.value.review = ''
    }

    const hasReviewed = computed(() => {
      return store.getters.reviews.some((review) => review.username === store.getters.username)
    })

    return {
      newReview,
      submitReview,
      reviews: computed(() => store.getters.reviews),
      averageRating: computed(() => store.getters.averageRating),
      isAuthenticated: computed(() => store.state.isAuthenticated),
      hasReviewed
    }
  }
}
</script> -->
