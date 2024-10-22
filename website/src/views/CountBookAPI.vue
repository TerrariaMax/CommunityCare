<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2 text-center">
        <h1>Total Reviews: {{ reviewCount }}</h1>
        <!-- Display review count -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const reviewCount = ref(0) // Create a ref for review count

    const fetchReviewCount = async () => {
      try {
        const response = await axios.get('https://countreviews-y4amwmkxvq-uc.a.run.app') // Replace with your Cloud Function URL
        reviewCount.value = response.data.count // Set the review count
      } catch (error) {
        console.error('Error fetching review count:', error)
      }
    }

    onMounted(() => {
      fetchReviewCount() // Fetch the review count when the component is mounted
    })

    return {
      reviewCount // Expose reviewCount to the template
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

<!-- <template>
  <div id="app">
    <h1>Review Counter</h1>
    <button @click="getReviewCount">Get Review Count</button>
    <p v-if="jsondata !== null">Total number of reviews: {{ jsondata }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  mounted() {
    this.getReviewCountAPI()
  },
  methods: {
    async getReviewCountAPI() {
      try {
        const response = await axios.get('https://your-api-endpoint-for-reviews.com') // Replace with your actual endpoint
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching review count:', error)
        this.error = 'Error fetching review count. Please try again later.'
        this.jsondata = null
      }
    }
  }
}
</script> -->

<!-- <template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ jsondata }}</p>
    <p v-if="error">{{ error }}</p>

    <router-link to="/get-all-books">View All Books</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-y4amwmkxvq-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.count = null
      }
    }
  }
}
</script> -->
<!-- 
<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>

    <router-link to="/get-all-books">View All Books</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      count: null,
      error: null
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-y4amwmkxvq-uc.a.run.app')
        this.count = response.data.count
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.count = null
      }
    }
  }
}
</script> -->

<!-- <template>
  <div class="text-center">
    <h1>Resources</h1>
    <p></p>
    <router-view />
  </div>
</template>

<script setup>
// No script needed for now
</script> -->

<style></style>
