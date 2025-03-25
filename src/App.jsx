import { Box, Container, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HealthTips from './pages/HealthTips'
import RemoteDoctor from './pages/RemoteDoctor'
import AIResponse from './pages/AIResponse'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-tips" element={<HealthTips />} />
          <Route path="/remote-doctor" element={<RemoteDoctor />} />
          <Route path="/ai-response" element={<AIResponse />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App