<template>
  <div id="app">
    <h1>All Books</h1>
    <button @click="getAllBooks">Get All Books</button>

    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.isbn }}</h2>
        <p>{{ book.name }}</p>
      </li>
    </ul>
    <router-link to="/">Back to Book Counter</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: []
    }
  },
  mounted() {
    this.fetchBooks()
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch('https://your-cloud-function-url/displayBooks')
        const data = await response.json()
        this.books = data
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
  }
}
</script>

<style scoped>
/* You can add any custom styles here */
</style>

<!-- <template>
  <div id="app">
    <h1>All Books</h1>
    <button @click="getAllBooks">Get All Books</button>
    <pre v-if="booksData">{{ booksData }}</pre>
    <p v-if="error">{{ error }}</p>
    <router-link to="/">Back to Book Counter</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      booksData: null,
      error: null
    }
  },
  methods: {
    async getAllBooks() {
      try {
        const response = await axios.get('https://countbooks-y4amwmkxvq-uc.a.run.app')
        this.booksData = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = 'Error fetching books.'
        this.booksData = null
      }
    }
  }
}
</script> -->
