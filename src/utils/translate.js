// src/utils/translate.js

export async function translateToHindi(text) {
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`
  
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        target: 'hi',
        format: 'text',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  
    const data = await response.json()
    if (data?.data?.translations?.[0]?.translatedText) {
      return data.data.translations[0].translatedText
    } else {
      throw new Error('Translation failed')
    }
  }
  