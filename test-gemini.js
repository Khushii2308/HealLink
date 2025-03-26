import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(API_KEY);

// You can switch between "gemini-1.5-pro" and "gemini-1.5-flash"
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Generate AI response from Gemini 1.5 model
 * @param {string} prompt - The user's health-related question or text prompt
 * @returns {Promise<string>} - AI-generated response text
 */
export async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    if (!text) throw new Error("Empty response from Gemini API");
    return text;
  } catch (err) {
    console.error("❌ Gemini API Error:", err.message);
    throw new Error("Failed to get response from Gemini");
  }
}
