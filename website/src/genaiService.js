import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_GENAI_API_KEY)

export async function generateText(prompt) {
  try {
    const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(prompt)

    return result.response.text()
  } catch (error) {
    console.error('Error generating text:', error)
    throw error
  }
}
