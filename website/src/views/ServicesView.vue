<!-- <template>
  <div class="text-center">
    <h1>Our Services</h1>

    <router-view />
  </div>
</template> -->

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
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :class="{ 'btn-secondary': !isAuthenticated }"
            :disabled="!isAuthenticated"
          >
            Submit
          </button>
        </form>

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

    // Load reviews from local storage on mount
    onMounted(() => {
      store.dispatch('loadReviews')
    })

    const submitReview = () => {
      const review = {
        ...newReview.value,
        username: store.getters.username,
        id: Date.now()
      }
      store.dispatch('addReview', review)
      newReview.value.rating = 0
      newReview.value.review = ''
    }

    return {
      newReview,
      submitReview,
      reviews: computed(() => store.getters.reviews),
      averageRating: computed(() => store.getters.averageRating),
      isAuthenticated: computed(() => store.state.isAuthenticated)
    }
  }
}
</script>
