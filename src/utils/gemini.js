import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('🚫 Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Generate structured health advice using Gemini 1.5 Pro
 * @param {string} question - The user's health-related query
 * @returns {Promise<Object>} - Health assessment object
 */
export async function getHealthAdvice(question) {
  try {
    const prompt = `
You are an AI medical assistant. Based on the following question, return a structured JSON response with:
- issue: (1-4 word possible condition)
- urgency: (Low, Moderate, High)
- advice: (2-3 sentences of helpful advice)
- shouldSeeDoctor: (true or false)

Respond ONLY in this format:
{
  "issue": "...",
  "urgency": "...",
  "advice": "...",
  "shouldSeeDoctor": true/false
}

User's question: ${question}
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    console.log("🧠 Gemini Raw Response:", responseText);

    // Try to parse the response
    const parsed = JSON.parse(responseText);

    // Return structured object with fallbacks
    return {
      issue: parsed.issue || "General Health Concern",
      urgency: parsed.urgency || "Unknown",
      advice: parsed.advice || "Please rest, stay hydrated, and consult a doctor if symptoms worsen.",
      shouldSeeDoctor: parsed.shouldSeeDoctor ?? true,
    };

  } catch (err) {
    console.error("❌ Error from Gemini:", err.message);

    return {
      issue: "Health Check Failed",
      urgency: "Unknown",
      advice: "We couldn't analyze your question at the moment. Please try again or consult a medical professional.",
      shouldSeeDoctor: true,
    };
  }
}
