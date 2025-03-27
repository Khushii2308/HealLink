import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const defaultTips = [
  {
    id: 1,
    tip: '💧 Stay hydrated: Drink at least 8 glasses of water daily.',
    category: 'Hydration',
  },
  {
    id: 2,
    tip: '😴 Get enough sleep: Aim for 7–9 hours to support mental and physical health.',
    category: 'Sleep',
  },
  {
    id: 3,
    tip: '🚶 Exercise daily: Even a 30-minute walk boosts your health and mood.',
    category: 'Exercise',
  },
  {
    id: 4,
    tip: '🥦 Eat healthy: Include fruits, veggies, grains, and proteins in meals.',
    category: 'Nutrition',
  },
]

const HealthTips = ({ toggleTheme, mode }) => {
  const [tips, setTips] = useState(defaultTips)
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * defaultTips.length))
  const theme = useTheme()

  // Auto switch every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [tips])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length)
  }

  const handleAddTip = async () => {
    try {
      const prompt = `Give me a short, friendly daily health tip with an emoji and its category. Respond in JSON like: {"tip": "💤 Sleep 8 hours daily.", "category": "Sleep"}`

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text
      const parsed = JSON.parse(content)

      setTips((prev) => [
        ...prev,
        { id: prev.length + 1, tip: parsed.tip, category: parsed.category },
      ])
      setCurrentIndex(tips.length)
    } catch (err) {
      console.error('Failed to fetch new tip:', err)
      alert('Could not generate new tip. Try again.')
    }
  }

  const currentTip = tips[currentIndex]

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Daily Health Tips
        </Typography>
        <IconButton onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Tip Card */}
      <motion.div
        key={currentTip.id}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 2 }}>
              {currentTip.tip}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Category: {currentTip.category}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNext}>
          Next
        </Button>
        <IconButton color="primary" onClick={handleAddTip}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
        Tips auto-refresh every 8 seconds 💡
      </Typography>
    </Box>
  )
}

export default HealthTips
