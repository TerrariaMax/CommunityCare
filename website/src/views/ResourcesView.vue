<template>
  <h1 class="mb-5">Hello I'm Gemini AI, ask me anything</h1>

  <form class="mb-5" @submit.prevent="fetchAnswer">
    <div>
      <textarea name="question" id="question" cols="30" rows="10" v-model="question"></textarea>
    </div>
    <button type="submit" :disabled="!question">
      {{ `${isLoading ? 'asking gemini...' : 'Ask'}` }}
    </button>
  </form>

  <div class="mb-10">
    <AIAnswer :answer="answer" />
  </div>

  <div>
    <SendEmail />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGetGenerativeModelGP } from '../composables/useGetGenerativeModelGP.js'
import AIAnswer from '../components/AIAnswer.vue'
import SendEmail from '../components/SendEmail.vue'

const question = ref('')
const answer = ref('')
const isLoading = ref(false)

const fetchAnswer = async () => {
  answer.value = ''
  isLoading.value = true

  try {
    answer.value = await useGetGenerativeModelGP(question.value)
  } catch (error) {
    console.log({ error })
  } finally {
    isLoading.value = false
    question.value = ''
  }
}
</script>

<style lang="scss" scoped>
.mb-5 {
  margin-bottom: 5rem;
}
.mb-10 {
  margin-bottom: 10rem;
}
</style>

<!-- <template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2 text-center">
        <h1>Total Reviews: {{ reviewCount }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const reviewCount = ref(0) // Create a ref for review count

    const fetchReviewCount = async () => {
      try {
        const response = await axios.get('https://countreviews-y4amwmkxvq-uc.a.run.app') // Replace with your Cloud Function URL
        reviewCount.value = response.data.count // Set the review count
      } catch (error) {
        console.error('Error fetching review count:', error)
      }
    }

    onMounted(() => {
      fetchReviewCount() // Fetch the review count when the component is mounted
    })

    return {
      reviewCount // Expose reviewCount to the template
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style> -->
