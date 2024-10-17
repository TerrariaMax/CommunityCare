<template>
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
</script>
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
