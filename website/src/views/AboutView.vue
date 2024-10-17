<template>
  <div>
    <h2>Add Book</h2>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const isbn = ref('')
    const name = ref('')

    // Fetch books with ISBN greater than 1000
    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    // Add a new book to Firestore
    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })

        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')

        // Refresh the books list after adding a new book
        fetchBooks()
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      isbn,
      name,
      addBook
    }
  }
}
</script>

<!-- <template>
  <div>
    <h2>Add Book</h2>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'

import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }
    return {
      isbn,
      name,
      addBook
    }
  },
  components: {
    BookList
  }
}
</script> -->

<!-- <template>
  <div class="text-center">
    <h1>About Us</h1>

    <router-view />
  </div>
</template> -->
