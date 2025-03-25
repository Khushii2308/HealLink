import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Divider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const doctors = [
  {
    id: 1,
    name: 'Dr. Emily Carter',
    specialization: 'General Medicine',
    languages: ['English', 'Hindi'],
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Dr. Sarah Wilson',
    specialization: 'Pediatrics',
    languages: ['English', 'Spanish'],
    availability: 'Available',
  },
]

const RemoteDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const navigate = useNavigate()

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const handleStartCall = () => {
    // Implementation for video call will be added here
    console.log('Starting call with:', selectedDoctor?.name)
  }

  const handleStartChat = () => {
    // Implementation for chat will be added here
    console.log('Starting chat with:', selectedDoctor?.name)
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Connect with a Doctor
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} key={doctor.id}>
            <Card
              sx={{
                cursor: 'pointer',
                bgcolor:
                  selectedDoctor?.id === doctor.id ? 'action.selected' : 'inherit',
              }}
              onClick={() => handleDoctorSelect(doctor)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 56, height: 56, mr: 2 }}
                    alt={doctor.name}
                  />
                  <Box>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {doctor.specialization}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2">
                  Languages: {doctor.languages.join(', ')}
                </Typography>
                <Typography
                  variant="body2"
                  color={doctor.availability === 'Available' ? 'success.main' : 'error.main'}
                  sx={{ mt: 1 }}
                >
                  {doctor.availability}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedDoctor && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Connect with {selectedDoctor.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" onClick={handleStartCall}>
              Start Video Call
            </Button>
            <Button variant="outlined" onClick={handleStartChat}>
              Start Chat
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default RemoteDoctor