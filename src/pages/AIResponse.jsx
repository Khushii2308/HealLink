import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { getHealthAdvice } from '../utils/gemini'

const AIResponse = () => {
  const location = useLocation()
  const { question, language } = location.state || {}
  const [assessment, setAssessment] = useState(null)

  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAdvice() {
      if (!question) return
      
      try {
        setError(null)
        const result = await getHealthAdvice(question)
        setAssessment(result)
      } catch (err) {
        console.error('Error getting health advice:', err)
        setError('Sorry, we encountered an error while generating health advice. Please try again later.')
      }
    }

    fetchAdvice()
  }, [question])

  const translateText = () => {
    // Translation implementation will be added here
    console.log('Translating to:', language)
  }

  if (!assessment && !error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Analyzing your health concern...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <FavoriteIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          HealLink
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Health Assessment
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Suggested Health Issue: {assessment.issue}
          </Typography>
          <Typography
            variant="subtitle1"
            color={assessment.urgency === 'High' ? 'error.main' : 'text.secondary'}
            sx={{ mb: 2 }}
          >
            Urgency Level: {assessment.urgency}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Actionable Advice
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {assessment.advice}
          </Typography>
          {assessment.shouldSeeDoctor && (
            <Typography
              variant="subtitle1"
              color="error.main"
              sx={{ fontWeight: 500 }}
            >
              Please consider consulting a healthcare professional for proper diagnosis and treatment.
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={translateText}>
          Translate
        </Button>
        <Button
          variant="contained"
          href="/remote-doctor"
          component="a"
        >
          Talk to a Doctor
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}
      >
        Powered by HealLink AI
      </Typography>
    </Box>
  )
}

export default AIResponse