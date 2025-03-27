import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Home from './pages/Home'
import AIResponse from './pages/AIResponse'
import RemoteDoctor from './pages/RemoteDoctor'
import DoctorPage from './pages/DoctorPage'

function App() {
  const [mode, setMode] = useState('light')

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/ai-response" element={<AIResponse />} />
        <Route path="/remote-doctor" element={<RemoteDoctor />} />
        <Route path="/doctor/:id" element={<DoctorPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
