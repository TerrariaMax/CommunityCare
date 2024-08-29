<script setup>
import { ref } from 'vue'

const formData = ref({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  mobileNumber: ''
})

const errors = ref({
  fullname: null,
  email: null,
  password: null,
  confirmPassword: null,
  gender: null,
  mobileNumber: null
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

const submitForm = () => {
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (!errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
    console.log('Form submitted:', formData.value)
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    mobileNumber: ''
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">📝 Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="fullname" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="fullname" v-model="formData.fullname" />
            </div>

            <div class="col-md-6">
              <label for="email" class="form-label">Email Address</label>
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
            <div class="col-md-6">
              <label for="confirm-password" class="form-label">Re-enter Password</label>
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
              <label for="mobileNumber" class="form-label">Mobile Number</label>
              <input
                type="text"
                class="form-control"
                id="mobileNumber"
                v-model="formData.mobileNumber"
              />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" @click="clearForm">Sign Up</button>
            <!-- <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
.form-label {
  font-weight: bold;
}

.form-control {
  padding: 10px;
}

.row.mb-4 {
  margin-bottom: 1.5rem;
}

#fullname:focus,
#email:focus,
#password:focus,
#confirm-password:focus,
#mobileNumber:focus {
  border-color: #275fda;
  box-shadow: 0 0 5px rgba(39, 95, 218, 0.5);
}

.text-danger {
  color: #dc3545;
}
</style> -->

<style scoped>
/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
