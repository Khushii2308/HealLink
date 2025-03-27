import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Home from './pages/Home'
import AIResponse from './pages/AIResponse'
import RemoteDoctor from './pages/RemoteDoctor'
import DoctorPage from './pages/DoctorPage'

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light')

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/ai-response" element={<AIResponse toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/remote-doctor" element={<RemoteDoctor toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/doctor/:id" element={<DoctorPage toggleTheme={toggleTheme} mode={mode} />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
