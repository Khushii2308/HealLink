# HealLink AI 🩺🤖

**HealLink AI** is a smart healthcare assistant that provides AI-powered health assessments and multilingual support to improve access to medical insights. Built with React, Material UI, and integrated with the Gemini API, it offers a smooth and informative experience for users in underserved communities.

## 🌟 Features

- ✨ AI-driven health issue suggestions and actionable advice
- 🌐 Language toggle: English ↔ हिन्दी (Hindi)
- 🌗 Light/Dark mode theme switcher
- 👩‍⚕️ Doctor booking system with available time slots
- 🧠 Personalized health tips section
- 🎬 Smooth animations using Framer Motion

## 🗂️ Project Structure

```
/src
  ├── components/
  │   ├── AIResponse.jsx      # Health advice & translation logic
  │   ├── DoctorPage.jsx      # Doctor listing & booking
  │   ├── Tips.jsx            # Tips and health info
  ├── utils/
  │   ├── gemini.js           # Gemini API integration
  │   └── translate.js        # Translation utility
  ├── App.jsx
  └── main.jsx
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/healink-ai.git
cd healink-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root with your API keys:

```


VITE_GEMINI_API_KEY=your_gemini_key
VITE_GOOGLE_TRANSLATE_API_KEY=your_translate_key
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 🔗 Navigation

- `/` — Home Page
- `/ai-response` — AI Health Diagnosis Result
- `/remote-doctor` — Doctor Booking Page
- `/tips` — Health Tips Section

## 🧰 Built With

- React
- Material UI (MUI)
- Framer Motion
- Gemini API (Google DeepMind)
- Google Cloud Translation API

## 📸 Preview

*(Add screenshots or GIFs of your UI here)*

## 🧠 Future Scope

- Voice input with live translation
- Location-based emergency support
- Multi-user login and history tracking
- Offline tips and alerts

> Empowering access to healthcare through intelligent technology — with ❤️ from HealLink.
