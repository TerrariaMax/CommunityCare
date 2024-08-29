<!-- <template>
  <div class="login-container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @input="() => validatePassword(false)"
                @blur="() => validatePassword(true)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    validateName(onBlur) {
      if (!this.formData.username) {
        this.errors.username = 'Username is required'
      } else if (onBlur && this.formData.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters long'
      } else {
        this.errors.username = ''
      }
    },
    validatePassword(onBlur) {
      if (!this.formData.password) {
        this.errors.password = 'Password is required'
      } else if (onBlur && this.formData.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters long'
      } else {
        this.errors.password = ''
      }
    },
    handleLogin() {
      this.validateName(true)
      this.validatePassword(true)

      if (!this.errors.username && !this.errors.password) {
        const username = '123'
        const password = '123456'

        if (this.formData.username === username && this.formData.password === password) {
          const user = { username: this.formData.username, password: this.formData.password }
          this.login(user).then(() => {
            this.$router.push({ name: 'Home' })
          })
        } else {
          this.$router.push({ name: 'AccessDenied' })
        }
      }
    }
  }
}
</script> -->

<template>
  <div class="login-container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                @input="() => validateEmail(false)"
                @blur="() => validateEmail(true)"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @input="() => validatePassword(false)"
                @blur="() => validatePassword(true)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import useLocalStorage from '@/store/useLocalStorage'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    storedUsers() {
      return useLocalStorage([], 'users')
    }
  },
  methods: {
    ...mapActions(['login']),
    validateEmail(onBlur) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.formData.email) {
        this.errors.email = 'Email is required'
      } else if (onBlur && !emailPattern.test(this.formData.email)) {
        this.errors.email = 'Invalid email format'
      } else {
        this.errors.email = ''
      }
    },
    validatePassword(onBlur) {
      const password = this.formData.password
      const minLength = 6
      const hasNumber = /\d/.test(password)

      if (!password) {
        this.errors.password = 'Password is required'
      } else if (onBlur && password.length < minLength) {
        this.errors.password = `Password must be at least ${minLength} characters long`
      } else if (onBlur && !hasNumber) {
        this.errors.password = 'Password must contain at least one number'
      } else {
        this.errors.password = ''
      }
    },
    handleLogin() {
      this.validateEmail(true)
      this.validatePassword(true)

      if (!this.errors.email && !this.errors.password) {
        const storedUserData = JSON.parse(localStorage.getItem('users'))
        if (storedUserData) {
          const user = storedUserData.find(
            (user) => user.email === this.formData.email && user.password === this.formData.password
          )

          if (user) {
            console.log('Login successful:', user)
            this.$router.push({ name: 'Home' })
          } else {
            console.log('Access Denied: Invalid email or password')
            this.errors.email = 'Invalid email or password'
            this.$router.push({ name: 'AccessDenied' })
          }
        } else {
          console.log('No user data found in localStorage')
          this.$router.push({ name: 'AccessDenied' })

          // const handleLogin = () => {
          //     const storedUser = userData.value;
          //     if (storedUser.email === formData.value.email && storedUser.password === formData.value.password) {
          //         // Login successful, handle user session
          //     } else {
          //         // Handle invalid login
          //     }
          // };

          // const storedUser = JSON.parse(localStorage.getItem('user')) || {}
          // const { email, password } = this.formData

          // if (storedUser.email === email && storedUser.password === password) {
          //   const user = { email, password }
          //   this.login(user).then(() => {
          //     this.$router.push({ name: 'Home' })
          //   })
          // } else {
          //   this.errors.email = 'Invalid email or password'
          // }

          // const user = this.storedUsers.find(
          //   (u) => u.email === this.formData.email && u.password === this.formData.password
          // )
          // if (user) {
          //   this.login(user).then(() => {
          //     this.$router.push({ name: 'Home' })
          //   })
          // } else {
          //   this.errors.email = 'Invalid email or password'
          // }

          // const email = 'user@example.com'
          // const password = '123456'

          // if (this.formData.email === email && this.formData.password === password) {
          //   const user = { email: this.formData.email, password: this.formData.password }
          //   this.login(user).then(() => {
          //     this.$router.push({ name: 'Home' })
          //   })
          // } else {
          //   this.$router.push({ name: 'AccessDenied' })
          // }
        }
      }
    }
  }
}
</script>
