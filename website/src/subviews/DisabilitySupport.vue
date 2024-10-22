<template>
  <div class="appointment-container">
    <h2>Book an Appointment</h2>

    <vue-cal
      v-model="selectedDate"
      :available-times="availableTimes"
      :disable-dates="disabledDates"
      :disable-time-range="disableTimeRange"
      @cell-click="onDateSelected"
      style="height: 400px"
    ></vue-cal>

    <div v-if="selectedDate">
      <h3>Selected Date & Time:</h3>
      <p>{{ selectedDate }}</p>
    </div>

    <form @submit.prevent="bookAppointment">
      <!-- <label for="name">Your Name:</label>
      <input type="text" v-model="formData.name" required />

      <label for="email">Your Email:</label>
      <input type="email" v-model="formData.email" required />

      <label for="phone">Your Phone:</label>
      <input type="tel" v-model="formData.phone" required /> -->

      <button type="submit" :disabled="!selectedDate">Confirm Appointment</button>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/init.js' // Adjust the path to your Firebase initialization

export default {
  components: {
    VueCal
  },
  setup() {
    const selectedDate = ref(null)
    const formData = ref({
      name: '',
      email: '',
      phone: ''
    })
    const successMessage = ref('')

    const availableTimes = [
      { start: '09:00', end: '12:00' },
      { start: '14:00', end: '18:00' }
    ]

    const disabledDates = ['2024-10-25', '2024-12-25'] // Example of specific dates to disable (holidays)
    const disableTimeRange = ['00:00', '09:00'] // Disable early morning times

    const onDateSelected = (event) => {
      // Capture selected date and time
      selectedDate.value = event.date
    }

    const bookAppointment = async () => {
      if (selectedDate.value) {
        const appointmentData = {
          ...formData.value,
          date: selectedDate.value.toISOString() // Store date in ISO format for Firestore
        }

        try {
          // Save appointment data to Firestore
          await addDoc(collection(db, 'appointments'), appointmentData)
          successMessage.value = `Appointment booked for ${selectedDate.value.toDateString()}`

          // Reset form data
          formData.value = {
            name: '',
            email: '',
            phone: ''
          }
          selectedDate.value = null
        } catch (error) {
          console.error('Error booking appointment:', error)
        }
      }
    }

    return {
      selectedDate,
      availableTimes,
      disabledDates,
      disableTimeRange,
      formData,
      successMessage,
      onDateSelected,
      bookAppointment
    }
  }
}
</script>

<style scoped>
.appointment-container {
  max-width: 600px;
  margin: auto;
}
form {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
.alert {
  margin-top: 10px;
}
</style>

<!-- <template>
  <div class="appointment-container">
    <h2>Book an Appointment</h2>

    <vue-cal
      :selected="selectedDate"
      :available-times="availableTimes"
      :disable-dates="disabledDates"
      :disable-time-range="disableTimeRange"
      @cell-click="onDateSelected"
      style="height: 400px"
    ></vue-cal>

    <div v-if="selectedDate">
      <h3>Selected Date & Time:</h3>
      <p>{{ selectedDate }}</p>
    </div>

    <form @submit.prevent="bookAppointment">
      <label for="name">Your Name:</label>
      <input type="text" v-model="formData.name" required />

      <label for="email">Your Email:</label>
      <input type="email" v-model="formData.email" required />

      <label for="phone">Your Phone:</label>
      <input type="tel" v-model="formData.phone" required />

      <button type="submit" :disabled="!selectedDate">Confirm Appointment</button>
    </form>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    VueCal
  },
  data() {
    return {
      selectedDate: null,
      availableTimes: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' }
      ],
      disabledDates: ['2024-10-25', '2024-12-25'], // Example of specific dates to disable (holidays)
      disableTimeRange: ['00:00', '09:00'], // Disable early morning times
      formData: {
        name: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    onDateSelected(event) {
      // Capture selected date and time
      this.selectedDate = event.date
    },
    bookAppointment() {
      if (this.selectedDate) {
        alert(`Appointment booked for ${this.selectedDate}`)
        // Here you can add API logic to save the appointment
      }
    }
  }
}
</script>

<style scoped>
.appointment-container {
  max-width: 600px;
  margin: auto;
}
form {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
</style> -->
<!-- 
<template>
  <div class="text-center">
    <h1>Disability Support</h1>
    <p></p>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style></style> -->
