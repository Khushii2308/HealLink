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
  IconButton,
  useTheme,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

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
  {
    id: 3,
    name: 'Dr. John Doe',
    specialization: 'Dermatology',
    languages: ['English'],
    availability: 'Unavailable',
  },
]

const RemoteDoctor = ({ toggleTheme, mode }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('All')

  const theme = useTheme()
  const navigate = useNavigate()

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const handleStartCall = () => {
    console.log('📞 Starting call with:', selectedDoctor?.name)
  }

  const handleStartChat = () => {
    console.log('💬 Starting chat with:', selectedDoctor?.name)
  }

  // Filter & Sort
  const filteredDoctors = doctors
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((doc) =>
      sortOption === 'All' ? true : doc.availability === sortOption
    )

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Connect with a Doctor
        </Typography>
        <IconButton onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Search & Sort */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Availability</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Availability"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Unavailable">Unavailable</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Doctor Cards */}
      <Grid container spacing={3}>
        {filteredDoctors.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No doctors found.
            </Typography>
          </Grid>
        ) : (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} key={doctor.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    cursor: 'pointer',
                    bgcolor:
                      selectedDoctor?.id === doctor.id
                        ? theme.palette.action.selected
                        : 'background.paper',
                    transition: '0.3s ease',
                    borderRadius: 3,
                  }}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ width: 56, height: 56, mr: 2 }} alt={doctor.name} />
                      <Box>
                        <Typography variant="h6">{doctor.name}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {doctor.specialization}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2">
                      🗣️ Languages: {doctor.languages.join(', ')}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={doctor.availability === 'Available' ? 'success.main' : 'error.main'}
                      sx={{ mt: 1 }}
                    >
                      ✅ {doctor.availability}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        )}
      </Grid>

      {/* Selected Doctor Actions */}
      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Connect with {selectedDoctor.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={handleStartCall}>
                📹 Start Video Call
              </Button>
              <Button variant="outlined" onClick={handleStartChat}>
                💬 Start Chat
              </Button>
            </Box>
          </Box>
        </motion.div>
      )}
    </Box>
  )
}

export default RemoteDoctor
