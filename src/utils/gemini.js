import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with proper error handling
let genAI;
try {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }
  genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini API:', error);
  throw error;
}

// Rate limiting configuration
let lastCallTime = 0;
const MIN_DELAY = 1000; // Minimum delay between API calls in milliseconds

// Helper function to implement rate limiting
const waitForRateLimit = () => {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  
  if (timeSinceLastCall < MIN_DELAY) {
    return new Promise(resolve => 
      setTimeout(resolve, MIN_DELAY - timeSinceLastCall)
    );
  }
  return Promise.resolve();
};

// Helper function to generate health advice
// Pre-written responses for common conditions
const commonConditions = {
  fever: {
    issue: 'Fever',
    urgency: 'Moderate',
    advice: 'Rest well, stay hydrated, and take over-the-counter fever reducers like acetaminophen if temperature is above 100.4°F (38°C). Use a light blanket and wear light clothing. Monitor temperature regularly.',
    shouldSeeDoctor: true
  },
  migraine: {
    issue: 'Migraine Headache',
    urgency: 'Moderate',
    advice: 'Rest in a quiet, dark room. Apply cold or warm compresses to your head or neck. Stay hydrated and consider over-the-counter pain relievers. Identify and avoid your migraine triggers.',
    shouldSeeDoctor: false
  },
  cold: {
    issue: 'Common Cold',
    urgency: 'Low',
    advice: 'Get plenty of rest, stay hydrated, and use over-the-counter cold medications for symptom relief. Use saline nasal drops and gargle with warm salt water for sore throat. Honey can help with cough.',
    shouldSeeDoctor: false
  },
  cough: {
    issue: 'Cough',
    urgency: 'Low',
    advice: 'Stay hydrated, use honey for soothing throat, consider over-the-counter cough suppressants for dry cough or expectorants for productive cough. Use a humidifier while sleeping.',
    shouldSeeDoctor: false
  }
};

export async function getHealthAdvice(question) {
  try {
    // Check if the question contains any common conditions
    const lowercaseQuestion = question.toLowerCase();
    for (const [condition, response] of Object.entries(commonConditions)) {
      if (lowercaseQuestion.includes(condition)) {
        return response;
      }
    }

    // If no common condition is found, proceed with API call
    await waitForRateLimit();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `As a medical AI assistant, provide a concise health assessment and advice for the following concern: ${question}\n\nPlease structure the response with:\n- Potential health issue\n- Urgency level (Low/Moderate/High)\n- Specific advice\n- Whether they should see a doctor\n\nKeep the response professional but easy to understand.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    if (!response) {
      throw new Error('Invalid response from Gemini API');
    }
    const text = response.text();

    // Parse the response to match our expected format
    const lines = text.split('\n').filter(line => line.trim());
    const assessment = {
      issue: '',
      urgency: 'Unknown',
      advice: '',
      shouldSeeDoctor: false
    };

    // More robust parsing logic
    for (const line of lines) {
      const lowercaseLine = line.toLowerCase();
      if (lowercaseLine.includes('health issue') || lowercaseLine.includes('potential')) {
        const [, value] = line.split(/[:|-]/);
        if (value) assessment.issue = value.trim();
      } else if (lowercaseLine.includes('urgency')) {
        const [, value] = line.split(/[:|-]/);
        if (value) assessment.urgency = value.trim();
      } else if (lowercaseLine.includes('advice')) {
        const [, value] = line.split(/[:|-]/);
        if (value) assessment.advice = value.trim();
      }
    }

    // Set shouldSeeDoctor based on various phrases
    assessment.shouldSeeDoctor = [
      'should see a doctor',
      'consult a',
      'medical attention',
      'healthcare professional',
      'seek medical'
    ].some(phrase => text.toLowerCase().includes(phrase));

    // Ensure we have valid data
    if (!assessment.issue || !assessment.advice) {
      throw new Error('Invalid response format from AI');
    }

    return assessment;
  } catch (error) {
    console.error('Error generating health advice:', error);
    
    // Handle specific API errors
    if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message?.includes('rate')) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    } else if (error.message?.includes('invalid') || error.message?.includes('key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.message?.includes('blocked') || error.message?.includes('permission')) {
      throw new Error('Access to the API is blocked. Please check your permissions.');
    } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    throw new Error('Unable to generate health advice. Please try again later.');
  } finally {
    // Always update lastCallTime after an API call attempt
    lastCallTime = Date.now();
  }
}