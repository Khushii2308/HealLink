import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  TextField, IconButton, Grid, Switch, useTheme, Paper, Avatar, Tooltip
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';

const Home = ({ toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Emily Carter',
      specialty: 'General Medicine',
      status: 'Available',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      specialty: 'Pediatrics',
      status: 'Busy',
      img: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 3,
      name: 'Dr. Raj Malhotra',
      specialty: 'Cardiology',
      status: 'Available',
      img: 'https://randomuser.me/api/portraits/men/77.jpg',
    },
  ];

  const handleGetAdvice = () => {
    if (symptoms.trim()) {
      navigate('/ai-response', { state: { question: symptoms } });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', color: 'text.primary' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            HeaLink<span style={{ color: '#1976D2' }}>AI</span>
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/remote-doctor')}>Remote Doctor</Button>
          </Box>
          <Tooltip title="Toggle Dark/Light Theme">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightModeIcon sx={{ color: theme.palette.mode === 'light' ? '#FFA500' : 'grey.500' }} />
              <Switch onChange={toggleTheme} checked={theme.palette.mode === 'dark'} />
              <DarkModeIcon sx={{ color: theme.palette.mode === 'dark' ? '#90CAF9' : 'grey.500' }} />
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to HeaLink AI
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Revolutionizing access to healthcare with AI-powered doctor consultations.
        </Typography>
      </Container>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Left: AI Health Advice */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2 }}>
                Daily Health Advice:
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                    <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                    <li>Stay hydrated and take a walk after sitting for an hour.</li>
                    <li>Drink at least 8 glasses of water daily to stay hydrated.</li>
                    <li>Get 7–9 hours of quality sleep every night for proper recovery.</li>
                    <li>Take a 5-minute walk every hour if you sit for long periods.</li>
                    <li>Eat colorful fruits and vegetables — they’re packed with antioxidants.</li>
                    
                   </ul>
               </Typography>
              <TextField
                fullWidth
                placeholder="Type or speak your symptoms..."
                variant="outlined"
                multiline
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <MicIcon />
                    </IconButton>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={handleGetAdvice}>
                GET ADVICE
              </Button>
            </Paper>
          </Grid>

          {/* Right: Top Doctors in a Box */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Top Doctors
              </Typography>
              {doctors.map((doc) => (
                <Paper
                  key={doc.id}
                  elevation={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Avatar src={doc.img} alt={doc.name} sx={{ width: 56, height: 56, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {doc.name}{' '}
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: 'green', verticalAlign: 'middle', ml: 0.5 }}
                      />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {doc.specialty}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: doc.status === 'Available' ? 'green' : 'orange' }}
                    >
                      {doc.status}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;