import { useState } from 'react'
import { Box, Typography, Button, Card, CardContent } from '@mui/material'

const healthTips = [
  {
    id: 1,
    tip: 'Stay hydrated: Drink at least 8 cups of water a day to keep your body healthy and functioning at its best.',
    category: 'General Health',
  },
  {
    id: 2,
    tip: 'Get enough sleep: Aim for 7-9 hours of sleep each night to maintain good physical and mental health.',
    category: 'Sleep',
  },
  {
    id: 3,
    tip: 'Exercise regularly: Even 30 minutes of walking daily can improve your overall health and mood.',
    category: 'Exercise',
  },
  {
    id: 4,
    tip: 'Eat a balanced diet: Include fruits, vegetables, whole grains, and proteins in your daily meals.',
    category: 'Nutrition',
  },
]

const HealthTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentTipIndex((prev) => (prev > 0 ? prev - 1 : healthTips.length - 1))
  }

  const handleNext = () => {
    setCurrentTipIndex((prev) => (prev < healthTips.length - 1 ? prev + 1 : 0))
  }

  const currentTip = healthTips[currentTipIndex]

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Daily Health Tips
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 2 }}>
            {currentTip.tip}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Category: {currentTip.category}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNext}>
          Next
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
        More Tips
      </Typography>
    </Box>
  )
}

export default HealthTips