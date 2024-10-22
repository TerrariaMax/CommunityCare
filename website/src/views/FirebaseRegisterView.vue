<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Sign Up</h1>
        <form @submit.prevent="submitForm" @keydown.enter="handleEnter">
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="fullname" class="form-label">Full Name *</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                v-model="formData.fullname"
                @input="validateFullName(false)"
                @blur="validateFullName(true)"
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
                @input="validateEmail(false)"
                @blur="validateEmail(true)"
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
                @input="validatePassword(false)"
                @blur="validatePassword(true)"
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
                @input="validateConfirmPassword(false)"
                @blur="validateConfirmPassword(true)"
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
                @input="validatePhone(false)"
                @blur="validatePhone(true)"
              />
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
//
import db from '../firebase/init.js'
import { doc, setDoc } from 'firebase/firestore'
// import { getFirestore, doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const auth = getAuth()

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
  phone: null
})

// Validation functions
const validateFullName = (blur) => {
  const fullNameRegex = /^[A-Za-z\s_]+$/
  if (!formData.value.fullname.trim()) {
    if (blur) errors.value.fullname = 'Full Name is required.'
  } else if (!fullNameRegex.test(formData.value.fullname.trim())) {
    errors.value.fullname = 'Full Name can only contain letters, spaces, and underscores.'
  } else {
    errors.value.fullname = null
  }
}

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

const validatePhone = (blur) => {
  if (formData.value.phone) {
    const phonePattern = /^[0-9]{10,12}$/
    if (!phonePattern.test(formData.value.phone)) {
      if (blur) errors.value.phone = 'Invalid phone number. Must be 10-12 digits.'
    } else {
      errors.value.phone = null
    }
  } else {
    errors.value.phone = null
  }
}

const handleEnter = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitForm()
  }
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
    if (formData.value.email === '7@gmail.com') {
      formData.value.role = 'Admin'
    }
    register()
  }
}

const register = () => {
  const { email, password, fullname, gender, phone, role } = formData.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user

      // Create the user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullname: fullname,
        email: email,
        gender: gender,
        phone: phone,
        role: role,
        createdAt: new Date()
      })

      console.log('User registered and profile saved:', { fullname, email, gender, phone, role })
      router.push({ name: 'Login' })
    })
    .catch((error) => {
      console.error('Error during registration:', error.code)
    })
}
// const register = () => {
//   const { email, password, fullname, gender, phone, role } = formData.value

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       const user = userCredential.user

//       console.log('User registered:', { fullname, email, gender, phone, role })
//       router.push({ name: 'Login' })
//     })
//     .catch((error) => {
//       console.error('Error during registration:', error.code)
//     })
// }
</script>
