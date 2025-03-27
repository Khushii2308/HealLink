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
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  useTheme,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { motion } from 'framer-motion'
import { getHealthAdvice } from '../utils/gemini'
import { translateToHindi } from '../utils/translate'

const AIResponse = ({ toggleTheme, mode }) => {
  const location = useLocation()
  const { question, language } = location.state || {}

  const [assessment, setAssessment] = useState(null)
  const [translated, setTranslated] = useState(null)
  const [error, setError] = useState(null)
  const [selectedLang, setSelectedLang] = useState(language || 'English')
  const [isTranslating, setIsTranslating] = useState(false)

  const theme = useTheme()
  const isHindi = selectedLang === 'Hindi'

  useEffect(() => {
    async function fetchAdvice() {
      if (!question) return

      try {
        setError(null)
        const result = await getHealthAdvice(question)
        setAssessment(result)

        if (isHindi && !translated) {
          await handleTranslation(result)
        }
      } catch (err) {
        console.error('Error getting health advice:', err)
        setError('Sorry, we encountered an error while generating health advice. Please try again later.')
      }
    }

    fetchAdvice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  const handleTranslation = async (data = assessment) => {
    try {
      setIsTranslating(true)
      const translatedIssue = await translateToHindi(data.issue)
      const translatedAdvice = await translateToHindi(data.advice)

      setTranslated({
        issue: translatedIssue,
        advice: translatedAdvice,
        urgency: data.urgency,
        shouldSeeDoctor: data.shouldSeeDoctor,
      })
    } catch (err) {
      console.error('Translation failed:', err)
      setError('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  const handleLanguageChange = async (_, newLang) => {
    if (!newLang) return
    setSelectedLang(newLang)

    if (newLang === 'Hindi' && !translated) {
      await handleTranslation()
    }
  }

  const display = isHindi && translated ? translated : assessment

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
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FavoriteIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight="bold">
            HealLink
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>

      {/* Language Toggle */}
      <ToggleButtonGroup
        value={selectedLang}
        exclusive
        onChange={handleLanguageChange}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="English">English</ToggleButton>
        <ToggleButton value="Hindi">हिन्दी</ToggleButton>
      </ToggleButtonGroup>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card elevation={3} sx={{ borderRadius: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {isHindi ? 'हेल्थ अस्सेसमेंट' : 'Health Assessment'}
            </Typography>

            <Typography variant="h6">
              {isHindi ? 'संभावित समस्या:' : 'Suggested Health Issue:'} {display.issue}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: display.urgency === 'High' ? 'error.main' : 'text.secondary', mb: 2 }}
            >
              {isHindi ? 'गंभीरता स्तर:' : 'Urgency Level:'} {display.urgency}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">
              {isHindi ? 'सलाह:' : 'Actionable Advice'}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              {display.advice}
            </Typography>

            {display.shouldSeeDoctor && (
              <Typography sx={{ mt: 2, color: 'error.main', fontWeight: 'bold' }}>
                {isHindi
                  ? 'कृपया किसी डॉक्टर से सलाह लें।'
                  : 'Please consider consulting a healthcare professional.'}
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" href="/remote-doctor">
          {isHindi ? 'डॉक्टर से बात करें' : 'Talk to a Doctor'}
        </Button>
      </Box>

      <Typography variant="body2" textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>
        Powered by HealLink AI
      </Typography>
    </Box>
  )
}

export default AIResponse
