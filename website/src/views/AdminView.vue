<template>
  <div class="dashboard-container">
    <!-- <h2 class="text-center">Admin Dashboard</h2> -->
    <h2 class="text-center">User Information</h2>
    <p></p>

    <div class="stats">
      <div class="card">
        <h3>Total Users</h3>
        <p>{{ totalUsers }}</p>
      </div>

      <div class="card" v-for="(count, type) in userTypeCounts" :key="type">
        <h3>{{ type }} Count</h3>
        <p>{{ count }}</p>
      </div>
    </div>

    <div>
      <ReviewCounter />
    </div>

    <interactive-table :data="users" :columns="columns" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'
import InteractiveTable from '../components/InteractiveTable.vue' // Adjust the import path as necessary
import ReviewCounter from '../components/ReviewCounter.vue'

export default {
  components: {
    InteractiveTable,
    ReviewCounter
  },
  setup() {
    const totalUsers = ref(0)
    const userTypeCounts = ref({})
    const users = ref([])
    const columns = [
      { label: 'Full Name', field: 'fullname' },
      { label: 'Email', field: 'email' },
      { label: 'Gender', field: 'gender' },
      { label: 'Phone', field: 'phone' }
    ]

    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const userDocs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      totalUsers.value = userDocs.length
      users.value = userDocs

      // Count types of users (this can be roles, or other attributes)
      userDocs.forEach((user) => {
        const role = user.role
        if (!userTypeCounts.value[role]) {
          userTypeCounts.value[role] = 0
        }
        userTypeCounts.value[role]++
      })
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      totalUsers,
      userTypeCounts,
      users,
      columns
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  width: 200px;
  text-align: center;
}
</style>

<!-- <template>
  <div class="dashboard-container">
    <h2>Admin Dashboard</h2>

    <div class="stats">
      <div class="card">
        <h3>Total Users</h3>
        <p>{{ totalUsers }}</p>
      </div>

      <div class="card" v-for="(count, type) in userTypeCounts" :key="type">
        <h3>{{ type }} Users</h3>
        <p>{{ count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'

export default {
  setup() {
    const totalUsers = ref(0)
    const userTypeCounts = ref({})

    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users = querySnapshot.docs.map((doc) => doc.data())
      totalUsers.value = users.length

      // Count types of users (this can be roles, or other attributes)
      users.forEach((user) => {
        const role = user.role
        if (!userTypeCounts.value[role]) {
          userTypeCounts.value[role] = 0
        }
        userTypeCounts.value[role]++
      })
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      totalUsers,
      userTypeCounts
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
}
.chart-section {
  width: 100%;
  margin-top: 30px;
}
</style> -->

<!-- <template>
  <div class="dashboard-container">
    <h2>Admin Dashboard</h2>
    <div class="stats">
      <div class="card">
        <h3>Total Users</h3>
        <p>{{ totalUsers }}</p>
      </div>

      <div class="card" v-for="(count, type) in userTypeCounts" :key="type">
        <h3>{{ type }} Users</h3>
        <p>{{ count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import db from '../firebase/init.js'

export default {
  name: 'AdminDashboard',
  setup() {
    const totalUsers = ref(0)
    const userTypeCounts = ref({
      Regular: 0,
      Admin: 0
    })

    const fetchUserStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const users = querySnapshot.docs.map((doc) => doc.data())

        // Count total users and by role
        totalUsers.value = users.length
        userTypeCounts.value.Admin = users.filter((user) => user.role === 'Admin').length
        userTypeCounts.value.Regular = users.filter((user) => user.role === 'User').length
      } catch (error) {
        console.error('Error fetching user stats:', error)
      }
    }

    onMounted(() => {
      fetchUserStats()
    })

    return {
      totalUsers,
      userTypeCounts
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 150px;
  max-width: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card p {
  font-size: 22px;
  font-weight: bold;
}
</style> -->

<!-- <template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <div class="stats">
      <h2>Overview</h2>
      <p>Total Users: {{ totalUsers }}</p>
      <p>Admin Users: {{ adminUsers }}</p>
      <p>Regular Users: {{ regularUsers }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import db from '../firebase/init.js'

export default {
  name: 'AdminDashboard',
  setup() {
    const totalUsers = ref(0)
    const adminUsers = ref(0)
    const regularUsers = ref(0)

    const fetchUserStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const users = querySnapshot.docs.map((doc) => doc.data())

        // Count total users and by role
        totalUsers.value = users.length
        adminUsers.value = users.filter((user) => user.role === 'Admin').length
        regularUsers.value = users.filter((user) => user.role === 'User').length
      } catch (error) {
        console.error('Error fetching user stats:', error)
      }
    }

    // Fetch data on component mount
    onMounted(() => {
      fetchUserStats()
    })

    return {
      totalUsers,
      adminUsers,
      regularUsers
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  background: #f4f4f4;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  width: 200px;
}

.card h3 {
  margin-bottom: 10px;
}

.card p {
  font-size: 1.5rem;
}
</style> -->

<!-- <template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">Admin Dashboard</h1>
        <p class="text-center">Manage user data and reviews.</p>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary me-2" @click="clearUser">Clear User</button>
          <button type="submit" class="btn btn-primary me-2" @click="clearReviews">
            Clear Reviews
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['clearUser', 'clearReviews'])
  }
}
</script>

<style scoped>
.btn {
  margin: 10px;
}
</style> -->
