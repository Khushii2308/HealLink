import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [language, setLanguage] = useState('English')
  const [question, setQuestion] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const navigate = useNavigate()

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // Voice input implementation will be added here
  }

  const handleGetAdvice = () => {
    if (question.trim()) {
      navigate('/ai-response', { state: { question, language } })
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          HealLink
        </Typography>
        <Select
          value={language}
          onChange={handleLanguageChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Hindi">हिंदी</MenuItem>
          <MenuItem value="Spanish">Español</MenuItem>
        </Select>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type your question here..."
            value={question}
            onChange={handleQuestionChange}
          />
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              color: isRecording ? 'error.main' : 'primary.main',
            }}
            onClick={handleVoiceInput}
          >
            <MicIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleGetAdvice}
          disabled={!question.trim()}
        >
          Get Advice
        </Button>
      </Box>
    </Container>
  )
}

export default Home