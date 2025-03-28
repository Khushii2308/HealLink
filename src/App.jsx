
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Home from './pages/Home'
import AIResponse from './pages/AIResponse'
import RemoteDoctor from './pages/RemoteDoctor'
import DoctorPage from './pages/DoctorPage'
import { lightTheme, darkTheme } from './theme'

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light')

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
        <Route path="/ai-response" element={<AIResponse toggleTheme={toggleTheme} mode={mode}/>} />
        <Route path="/remote-doctor" element={<RemoteDoctor toggleTheme={toggleTheme} mode={mode}/>} />
        <Route path="/doctor/:id" element={<DoctorPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
