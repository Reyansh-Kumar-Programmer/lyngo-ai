import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function ask(systemPrompt: string, userMessage: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: systemPrompt,
  })
  const result = await model.generateContent(userMessage)
  return result.response.text()
}

export async function startChat(systemPrompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: systemPrompt,
  })
  return model.startChat()
}
