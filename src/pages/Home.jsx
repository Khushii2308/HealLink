import React, { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  TextField, IconButton, Grid, Switch, useTheme, Paper, Avatar, Tooltip,
  Select, MenuItem
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import useSpeechToText from '../hooks/useSpeechToText';
const translations = {
  English: {
   welcome: 'Welcome to HealLink AI',
   revolutionizing: 'Revolutionizing access to healthcare with AI-powered doctor consultations.',
   dailyAdvice: 'Daily Health Advice:',
   stayHydrated: 'Stay hydrated and take a walk after sitting for an hour.',
   drinkWater: 'Drink at least 8 glasses of water daily.',
   qualitySleep: 'Get 7–9 hours of quality sleep every night.',
   eatFruits: 'Eat colorful fruits and vegetables.',
   limitProcessed: 'Limit processed foods and sugary drinks.',
   symptomsPlaceholder: 'Type or speak your symptoms...',

    getAdvice: 'GET ADVICE',
    topDoctors: 'Top Doctors',
    specialty:'Specialty',
    available: 'Available',
    busy: 'Busy',
    remoteDoctor: 'Remote Doctor'
  },
   Hindi: {
   welcome: 'हीललिंक एआई में आपका स्वागत है',
   revolutionizing: 'एआई-संचालित डॉक्टर परामर्श के साथ स्वास्थ्य सेवा तक पहुंच में क्रांति ला रहे हैं।',
   dailyAdvice: 'दैनिक स्वास्थ्य सलाह:',
   stayHydrated: 'हाइड्रेटेड रहें और एक घंटा बैठने के बाद टहलें।',
   drinkWater: 'रोजाना कम से कम 8 गिलास पानी पिएं।',
   qualitySleep: 'हर रात 7-9 घंटे की गुणवत्ता वाली नींद लें।',
   eatFruits: 'रंगीन फल और सब्जियां खाएं।',
   limitProcessed: 'प्रसंस्कृत खाद्य पदार्थों और मीठे पेय पदार्थों का सेवन सीमित करें।',
   symptomsPlaceholder: 'अपने लक्षणों को टाइप या बोलें...',
   getAdvice: 'सलाह प्राप्त करें',
   topDoctors: 'शीर्ष डॉक्टर',

    specialty:'विशेषज्ञता',
    available: 'उपलब्ध',
    busy: 'व्यस्त',
    remoteDoctor: 'दूरस्थ डॉक्टर',
  },
};
const Home = ({ toggleTheme }) => {
  const [language, setLanguage] = useState('English')
  const theme = useTheme();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const doctors = [
    { id: 1, name: 'Dr. Emily Carter', specialty: 'General Medicine', status: 'Available', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Dr. Sarah Wilson', specialty: 'Pediatrics', status: 'Busy', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 3, name: 'Dr. Raj Malhotra', specialty: 'Cardiology', status: 'Available', img: 'https://randomuser.me/api/portraits/men/77.jpg' },
  ];

  const { isListening, transcript, startListening, resetTranscript } = useSpeechToText();
  useEffect(() => {
    if (!isListening && transcript) {
      setSymptoms(transcript);
    }
  }, [isListening, transcript]);
  

  const handleGetAdvice = () => {
    const input = symptoms.trim() || transcript.trim();
    if (input) {
      navigate('/ai-response', { state: { question: input } });
      setSymptoms('');
      resetTranscript();
    }
  };

  const currentTranslations = translations[language] || translations['English'];
  
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' ,cursor:'pointer'}} onClick={()=>{navigate('/')}}>
            HealLink
            <span style={{ color: '#1976D2' }}>AI</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Select Language">
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Select value={language} onChange={handleLanguageChange} sx={{ height: 30, mr: 2 }} size="small">
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                </Select>
              </Box>
            </Tooltip>
           
            <Button sx={{ color: '#1976D2' }} onClick={() => navigate('/remote-doctor')}>{currentTranslations.remoteDoctor}</Button>
            <Tooltip title="Toggle Dark/Light Theme">
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightModeIcon sx={{ color: theme.palette.mode === 'light' ? '#FFA500' : 'grey.500' }} />
                <Switch onChange={toggleTheme} checked={theme.palette.mode === 'dark'} />
                <DarkModeIcon sx={{ color: theme.palette.mode === 'dark' ? '#90CAF9' : 'grey.500' }} />
              </Box>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 750, textTransform: 'uppercase', fontFamily: 'system-ui' }}>
        {currentTranslations.welcome}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
        {currentTranslations.revolutionizing}
        </Typography>
      </Container>
      
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Daily Health Advice:</Typography>
              <ul>
                  <li>{currentTranslations.stayHydrated}</li>
                  <li>{currentTranslations.drinkWater}</li>
                  <li>{currentTranslations.qualitySleep}</li>
                  <li>{currentTranslations.eatFruits}</li>
                  <li>{currentTranslations.limitProcessed}</li>
                </ul>
              <TextField
                 fullWidth
                 placeholder={currentTranslations.symptomsPlaceholder}
                 variant="outlined"
                 multiline
                rows={5}
                value={transcript || symptoms}
                onChange={(e) => { setSymptoms(e.target.value); resetTranscript(); }}
                InputProps={{
                  endAdornment: (
                    <IconButton color={isListening ? "error" : "primary"} onClick={startListening}>
                      <MicIcon color={isListening ? "error" : "primary"} />
                    </IconButton>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={handleGetAdvice}>
                {currentTranslations.getAdvice}
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}><Typography variant="h6" sx={{ mb: 2 }}>{currentTranslations.topDoctors}</Typography>
              {doctors.map((doc) => (
                <Paper key={doc.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 2 }}>
                  <Avatar src={doc.img} alt={doc.name} sx={{ width: 56,  height: 56, mr: 2, borderRadius: 3 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {doc.name} <CheckCircleIcon fontSize="small" sx={{ color: 'green', verticalAlign: 'middle', ml: 0.5 }} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{currentTranslations.specialty}</Typography>
                    <Typography variant="body2" sx={{ color: doc.status === 'Available' ? 'green' : 'orange' }}>{doc.status ==='Available'? currentTranslations.available :currentTranslations.busy }</Typography>
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

export default Home
