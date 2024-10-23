<template>
  <div>
    <h1>Send Email</h1>
    <form @submit.prevent="sendEmail">
      <div>
        <label for="to">Recipient Email:</label>
        <input v-model="email.to" type="email" id="to" placeholder="Recipient" required />
      </div>
      <div>
        <label for="subject">Subject:</label>
        <input v-model="email.subject" type="text" id="subject" placeholder="Subject" required />
      </div>
      <div>
        <label for="text">Message:</label>
        <textarea
          v-model="email.text"
          id="text"
          placeholder="Type your message here..."
          required
        ></textarea>
      </div>
      <button type="submit">Send Email</button>
    </form>
    <div v-if="message" :class="messageType">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        to: '',
        subject: '',
        text: ''
      },
      message: '',
      messageType: ''
    }
  },
  methods: {
    async sendEmail() {
      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          //   mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.email)
        })

        if (response.ok) {
          this.message = 'Email sent successfully!'
          this.messageType = 'success'
        } else {
          this.message = 'Failed to send email.'
          this.messageType = 'error'
        }
      } catch (error) {
        this.message = 'Error: ' + error.message
        this.messageType = 'error'
      }
    }
  }
}
</script>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
