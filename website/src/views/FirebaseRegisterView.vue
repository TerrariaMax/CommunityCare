<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="fullname" class="form-label">Full Name *</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                v-model="formData.fullname"
                @input="() => validateFullName(false)"
                @blur="() => validateFullName(true)"
              />
              <div v-if="errors.fullname" class="text-danger">{{ errors.fullname }}</div>
            </div>

            <div class="col-md-6">
              <label for="email" class="form-label">Email Address *</label>
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
          </div>

          <div class="row mb-4">
            <div class="col-md-6">
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
            <div class="col-md-6">
              <label for="confirm-password" class="form-label">Re-enter Password *</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @input="() => validateConfirmPassword(false)"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                v-model="formData.phone"
                @input="() => validatePhone(false)"
                @blur="() => validatePhone(true)"
              />
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" @click="register" class="btn btn-primary me-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- <h1>Create an Account</h1> -->
  <!-- <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p> -->
  <!-- <p><button @click="register">Save to Firebase</button></p> -->
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import useLocalStorage from '../store/useLocalStorage'

const router = useRouter()

const users = useLocalStorage([], 'users')

const formData = ref({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  phone: '',
  role: 'User'
})

const errors = ref({
  fullname: null,
  email: null,
  password: null,
  confirmPassword: null,
  gender: null,
  phone: null
})

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Invalid email format.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 6
  const hasNumber = /\d/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateFullName = (blur) => {
  if (!formData.value.fullname.trim()) {
    if (blur) errors.value.fullname = 'Full Name is required.'
  } else {
    errors.value.fullname = null
  }
}

const validatePhone = (blur) => {
  if (formData.value.phone) {
    const phonePattern = /^[0-9]{10,12}$/ //
    if (!phonePattern.test(formData.value.phone)) {
      if (blur) errors.value.phone = 'Invalid phone number. Must be 10-12 digits.'
    } else {
      errors.value.phone = null
    }
  } else {
    errors.value.phone = null
  }
}

const sanitizeInput = (input) => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const submitForm = () => {
  validateFullName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validatePhone(true)

  if (
    !errors.value.fullname &&
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.phone
  ) {
    const existingUser = users.value.find((user) => user.email === formData.value.email)
    if (existingUser) {
      errors.value.email = 'Email is already registered.'
      return
    }

    const sanitizedData = {
      fullname: sanitizeInput(formData.value.fullname),
      email: sanitizeInput(formData.value.email),
      password: sanitizeInput(formData.value.password),
      confirmPassword: sanitizeInput(formData.value.confirmPassword),
      gender: sanitizeInput(formData.value.gender),
      phone: sanitizeInput(formData.value.phone),
      role: 'User'
    }

    console.log('Form submitted:', sanitizedData)

    users.value.push(sanitizedData)
    clearForm()
    router.push({ name: 'Login' })
  }
}

const clearForm = () => {
  formData.value = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    role: 'User'
  }
}

const auth = getAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Successful Registered!')
      router.push({ name: 'Login' })
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<!-- <template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Successful Registered!')
      router.push({ name: 'Login' })
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script> -->
