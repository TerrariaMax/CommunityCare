<template>
  <div class="genai-container">
    <h3>AI Content Generator (Gemini)</h3>
    <textarea v-model="userInput" placeholder="Enter a prompt..."></textarea>
    <button @click="generateContent">Generate Content</button>

    <div v-if="response">
      <h4>Generated Content:</h4>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInput: '',
      response: '',
      apiKey: 'AIzaSyDroBmSMCxCniidM7kRDTNMvyzO7m-tYp8 ' // Replace with your Gemini API key
    }
  },
  methods: {
    async generateContent() {
      try {
        const result = await axios.post(
          'https://gemini-api-url-here/v1/generate', // Replace with actual Gemini API endpoint
          {
            prompt: this.userInput,
            max_tokens: 100, // Adjust based on API documentation
            temperature: 0.7 // Adjust the creativity
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )

        this.response = result.data.choices[0].text.trim()
      } catch (error) {
        console.error('Error fetching data from Gemini API:', error)
      }
    }
  }
}
</script>

<style>
/* Similar CSS as in OpenAI example */
.genai-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

h4 {
  margin-top: 20px;
}

p {
  white-space: pre-wrap;
}
</style>

<!-- <template>
  <div class="text-center">
    <h1>News</h1>
    <p></p>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style></style> -->
