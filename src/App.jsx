import { useState, useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AIResponse from './pages/AIResponse'
import HealthTips from './pages/HealthTips'
import RemoteDoctor from './pages/RemoteDoctor'

function App() {
  const [mode, setMode] = useState('light')

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f9f9f9',
            paper: mode === 'dark' ? '#1e1e1e' : '#fff',
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Home toggleTheme={toggleTheme} mode={mode} />} />
            <Route path="/ai-response" element={<AIResponse toggleTheme={toggleTheme} mode={mode} />} />
            <Route path="/health-tips" element={<HealthTips toggleTheme={toggleTheme} mode={mode} />} />
            <Route path="/remote-doctor" element={<RemoteDoctor toggleTheme={toggleTheme} mode={mode} />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
