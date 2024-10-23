import { GoogleGenerativeAI } from '@google/generative-ai'

export const useGenAi = async (modelType) => {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: modelType })

  return model
}
