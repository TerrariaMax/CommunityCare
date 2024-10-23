<template>
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
</style>
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
