export async function translateToHindi(text) {
  if (!text?.trim()) {
    return "⚠️ No text provided for translation";
  }

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error("🚨 Google Translate API key is missing. Check your .env file.");
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        q: text,
        target: "hi",
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("🚨 Google Translate API Error:", data);
      throw new Error(`Translation API failed: ${data.error?.message || "Unknown error"}`);
    }

    return data?.data?.translations?.[0]?.translatedText || "⚠️ Translation unavailable";
  } catch (error) {
    console.error("❌ Translation failed:", error);
    throw new Error("Translation request failed. Please check your network or API key.");
  }
}
