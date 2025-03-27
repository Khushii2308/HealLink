import { useState, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = ({ toggleTheme, mode }) => {
  const [language, setLanguage] = useState('English')
  const [question, setQuestion] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const theme = useTheme()

  const doctors = [
    {
      id: '1',
      name: 'Dr. Emily Carter',
      specialization: 'General Medicine',
      languages: ['English', 'Hindi'],
      availability: 'Available',
      verified: true,
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      specialization: 'Pediatrics',
      languages: ['English', 'Spanish'],
      availability: 'Busy',
      verified: true,
    },
    {
      id: '3',
      name: 'Dr. Raj Malhotra',
      specialization: 'Cardiology',
      languages: ['Hindi', 'English'],
      availability: 'Available',
      verified: false,
    },
  ]

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleConsentAgree = () => {
    setConsentOpen(false)
    startVoiceRecognition()
  }

  const handleVoiceInput = () => {
    setConsentOpen(true)
  }

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN'
      recognitionRef.current.interimResults = false
      recognitionRef.current.maxAlternatives = 1

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setQuestion((prev) => (prev ? `${prev} ${transcript}` : transcript))
        setIsRecording(false)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }

    if (!isRecording) {
      setIsRecording(true)
      recognitionRef.current.start()
    } else {
      setIsRecording(false)
      recognitionRef.current.stop()
    }
  }

  const handleGetAdvice = () => {
    if (question.trim()) {
      navigate('/ai-response', { state: { question, language } })
    }
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header & Theme Toggle */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            HealLink
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Language Selector */}
        <Select
          value={language}
          onChange={handleLanguageChange}
          fullWidth
          size="small"
          sx={{ mb: 3 }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Hindi">हिंदी</MenuItem>
        </Select>

        {/* Input Field */}
        <Box sx={{ position: 'relative', mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type or speak your symptoms..."
            value={question}
            onChange={handleQuestionChange}
            variant="outlined"
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

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleGetAdvice}
          disabled={!question.trim()}
        >
          Get Advice
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/remote-doctor')}
        >
          Connect to a Doctor
        </Button>

        {/* Top Doctors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
            👨‍⚕️ Top Doctors
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {doctors.map((doc) => (
              <Box
                key={doc.id}
                onClick={() => navigate(`/doctor/${doc.id}`)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {doc.name} {doc.verified && '✅'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doc.specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🗣️ {doc.languages.join(', ')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: doc.availability === 'Available' ? 'green' : 'orange',
                  }}
                >
                  {doc.availability}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Footer */}
        <Typography
          variant="body2"
          sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
        >
          Powered by HealLink AI
        </Typography>

        {/* Privacy Consent Modal */}
        <Dialog open={consentOpen} onClose={() => setConsentOpen(false)}>
          <DialogTitle>Privacy Notice</DialogTitle>
          <DialogContent>
            <Typography>
              Do you consent to voice capture for healthcare advice?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConsentOpen(false)}>Decline</Button>
            <Button variant="contained" onClick={handleConsentAgree}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  )
}

export default Home
