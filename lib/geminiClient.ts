// lib/geminiClient.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function callGemini(prompt: string) {
  try {
    // Use a valid model name and stable v1 endpoint
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { text };
  } catch (err) {
    console.error("Gemini API error:", err);
    return { text: "Sorry, I couldn't generate the story right now." };
  }
}
