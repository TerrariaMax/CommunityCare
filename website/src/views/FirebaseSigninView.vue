<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="row mb-4">
            <div class="col-md-6 col-sm-6">
              <label for="email" class="form-label">Email *</label>
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
              <label for="password" class="form-label">Password *</label>
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
            <button type="submit" class="btn btn-primary me-2" @click="signin">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

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
  // computed: {
  //   ...mapGetters(['isAuthenticated'])
  // },
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
        this.firebaseLogin()
      }
    },
    firebaseLogin() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
        .then((userCredential) => {
          console.log('Firebase Sign in Successful!')
          const user = userCredential.user
          this.login(user)
          console.log('isAuthenticated after login:', this.$store.state.isAuthenticated)
          this.$router.push({ name: 'Home' }) // Redirect to home page
        })
        .catch((error) => {
          console.error(error.code)
          if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            this.errors.email = 'Invalid email or password'
          } else {
            this.errors.email = 'Login failed. Please try again.'
          }
        })
    }
  }
}
</script>

<!-- <template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Sign in Successful!')
      router.push({ name: 'Home' })
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script> -->
