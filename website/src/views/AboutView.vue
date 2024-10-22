<template>
  <div class="contact-list-container">
    <h2 class="title">Contact List</h2>
    <label for="sortOrder">Order:</label>
    <select id="sortOrder" v-model="sortOrder" @change="sortData">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

    <InteractiveTable :data="sortedUsersData" :columns="userColumns" class="table" />
    <button @click="exportData('csv')" class="export-btn">Export to CSV</button>
    <button @click="exportData('pdf')" class="export-btn">Export to PDF</button>
  </div>
</template>

<script>
import InteractiveTable from '@/components/InteractiveTable.vue'
import { jsPDF } from 'jspdf'

export default {
  components: {
    InteractiveTable
  },
  data() {
    return {
      usersData: [
        {
          name: 'Alice Smith',
          email: 'alice.smith@gmail.com',
          phone: '0611234567',
          contactType: 'Aged Care Specialist'
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@gmail.com',
          phone: '0612345678',
          contactType: 'Aged Care Advisor'
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@gmail.com',
          phone: '0613456789',
          contactType: 'Family Support Specialist'
        },
        {
          name: 'Diana Prince',
          email: 'diana.prince@gmail.com',
          phone: '0614567890',
          contactType: 'Crisis Counselor'
        },
        {
          name: 'Ethan Hunt',
          email: 'ethan.hunt@gmail.com',
          phone: '0615678901',
          contactType: 'Support Services Manager'
        },
        {
          name: 'Fiona Gallagher',
          email: 'fiona.gallagher@gmail.com',
          phone: '0616789012',
          contactType: 'Family Violence Advocate'
        },
        {
          name: 'George Clooney',
          email: 'george.clooney@gmail.com',
          phone: '0617890123',
          contactType: 'Disability Advocate'
        },
        {
          name: 'Hannah Montana',
          email: 'hannah.montana@gmail.com',
          phone: '0618901234',
          contactType: 'Disability Support Worker'
        },
        {
          name: 'Ian Malcolm',
          email: 'ian.malcolm@gmail.com',
          phone: '0619012345',
          contactType: 'Rehabilitation Specialist'
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@gmail.com',
          phone: '0610123456',
          contactType: 'Support Coordinator'
        },
        {
          name: 'Kevin Hart',
          email: 'kevin.hart@gmail.com',
          phone: '0611230987',
          contactType: 'Aged Care Consultant'
        },
        {
          name: 'Laura Croft',
          email: 'laura.croft@gmail.com',
          phone: '0612348901',
          contactType: 'Care Coordinator'
        },
        {
          name: 'Mike Wazowski',
          email: 'mike.wazowski@gmail.com',
          phone: '0613456780',
          contactType: 'Crisis Counselor'
        },
        {
          name: 'Nina Simone',
          email: 'nina.simone@gmail.com',
          phone: '0614567893',
          contactType: 'Family Support Specialist'
        },
        {
          name: 'Oscar Isaac',
          email: 'oscar.isaac@gmail.com',
          phone: '0615678904',
          contactType: 'Aged Care Specialist'
        },
        {
          name: 'Paula Patton',
          email: 'paula.patton@gmail.com',
          phone: '0616789015',
          contactType: 'Disability Advocate'
        },
        {
          name: 'Quentin Tarantino',
          email: 'quentin.tarantino@gmail.com',
          phone: '0617890126',
          contactType: 'Support Services Manager'
        },
        {
          name: 'Rosa Parks',
          email: 'rosa.parks@gmail.com',
          phone: '0618901237',
          contactType: 'Aged Care Advisor'
        },
        {
          name: 'Steve Jobs',
          email: 'steve.jobs@gmail.com',
          phone: '0619012348',
          contactType: 'Family Violence Advocate'
        },
        {
          name: 'Tina Fey',
          email: 'tina.fey@gmail.com',
          phone: '0610123459',
          contactType: 'Rehabilitation Specialist'
        },
        {
          name: 'Uma Thurman',
          email: 'uma.thurman@gmail.com',
          phone: '0611234562',
          contactType: 'Crisis Counselor'
        },
        {
          name: 'Victor Hugo',
          email: 'victor.hugo@gmail.com',
          phone: '0612345673',
          contactType: 'Care Coordinator'
        },
        {
          name: 'Will Smith',
          email: 'will.smith@gmail.com',
          phone: '0613456784',
          contactType: 'Support Coordinator'
        }
      ],
      userColumns: [
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Phone Number', field: 'phone' },
        { label: 'Type of Contact', field: 'contactType' }
      ],
      sortOrder: 'asc'
    }
  },
  computed: {
    sortedUsersData() {
      return this.usersData.slice().sort((a, b) => {
        const modifier = this.sortOrder === 'asc' ? 1 : -1
        return modifier * a.name.localeCompare(b.name)
      })
    }
  },
  methods: {
    exportData(format) {
      if (format === 'csv') {
        this.exportToCSV()
      } else if (format === 'pdf') {
        this.exportToPDF()
      }
    },

    exportToCSV() {
      const csvData = [
        ['Name', 'Email', 'Phone Number', 'Contact Type'],
        ...this.usersData.map((user) => [user.name, user.email, user.phone, user.contactType])
      ]
        .map((e) => e.join(','))
        .join('\n')

      // Create a blob from the CSV string
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'contact-list.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    exportToPDF() {
      const doc = new jsPDF()

      // Title
      doc.text('Contact List', 10, 10)

      // Table Headers
      const headers = ['Name', 'Email', 'Phone', 'Contact Type']
      let startY = 20

      // Add headers to the PDF
      headers.forEach((header, index) => {
        doc.text(header, 10 + index * 50, startY) // Adjust spacing between columns
      })

      // Add each contact as a new row in the PDF
      startY += 10
      this.usersData.forEach((user, index) => {
        const row = [user.name, user.email, user.phone, user.contactType]

        // Wrap long text for email
        const wrappedEmail = doc.splitTextToSize(user.email, 40) // Limit email to fit in 40px width

        doc.text(user.name, 10, startY + index * 20)
        doc.text(wrappedEmail, 60, startY + index * 20) // Email wrapped to the next line if too long
        doc.text(user.phone, 110, startY + index * 20)
        doc.text(user.contactType, 150, startY + index * 20)
      })

      // Save the generated PDF
      doc.save('contact-list.pdf')
    },

    // exportToPDF() {
    //   const doc = new jsPDF()

    //   // Title
    //   doc.text('Contact List', 10, 10)

    //   // Table Headers
    //   const headers = ['Name', 'Email', 'Phone', 'Contact Type']
    //   let startY = 20 // Initial y-axis offset

    //   // Add headers to the PDF
    //   headers.forEach((header, index) => {
    //     doc.text(header, 10 + index * 40, startY)
    //   })

    //   // Add each contact as a new row in the PDF
    //   startY += 10 // Adjust the y-axis for the next line
    //   this.usersData.forEach((user, index) => {
    //     const row = [user.name, user.email, user.phone, user.contactType]
    //     row.forEach((cell, cellIndex) => {
    //       doc.text(cell, 10 + cellIndex * 40, startY + index * 10)
    //     })
    //   })

    //   // Save the generated PDF
    //   doc.save('contact-list.pdf')
    // },

    sortData() {
      console.log(`Sorted by name in ${this.sortOrder} order.`)
    }
  }
}
</script>

<style scoped>
.contact-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.table tr:hover {
  background-color: #f1f1f1;
}
</style>

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
</script> -->

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
