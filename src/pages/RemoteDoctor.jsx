import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Verified } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const doctors = [
  { name: 'Dr. Anjali Verma', specialty: 'General Physician', image: '/doctors/anjali.jpg', verified: true },
  { name: 'Dr. Rohan Mehta', specialty: 'Cardiologist', image: '/doctors/rohan.jpg', verified: true },
  { name: 'Dr. Pooja Sharma', specialty: 'Pediatrician', image: '/doctors/pooja.jpg', verified: false },
  { name: 'Dr. Vikram Singh', specialty: 'Dermatologist', image: '/doctors/vikram.jpg', verified: true },
  { name: 'Dr. Nisha Patel', specialty: 'Neurologist', image: '/doctors/nisha.jpg', verified: false },
  { name: 'Dr. Rahul Das', specialty: 'Orthopedic Surgeon', image: '/doctors/rahul.jpg', verified: true },
  { name: 'Dr. Meera Kapoor', specialty: 'Psychiatrist', image: '/doctors/meera.jpg', verified: true },
  { name: 'Dr. Arjun Nair', specialty: 'ENT Specialist', image: '/doctors/arjun.jpg', verified: false },
];

const RemoteDoctor = () => {
  const navigate = useNavigate();
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Get all unique specialties for dropdown
  const specialties = [...new Set(doctors.map((doc) => doc.specialty))];

  // Apply all filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesVerification = showVerifiedOnly ? doctor.verified : true;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesVerification && matchesSearch && matchesSpecialty;
  });

  return (
    <Container sx={{ pt: 4 }}>
      {/* Back to Home Button */}
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          &larr; Back to Home
        </Button>
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Connect with a Doctor
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Search by name or specialty"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Filter by Specialty</InputLabel>
          <Select
            value={selectedSpecialty}
            label="Filter by Specialty"
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <MenuItem value="">All Specialties</MenuItem>
            {specialties.map((spec, idx) => (
              <MenuItem key={idx} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={showVerifiedOnly}
              onChange={() => setShowVerifiedOnly((prev) => !prev)}
              color="primary"
            />
          }
          label="Show Verified Doctors Only"
        />
      </Box>

      {/* Doctor Cards */}
      <Grid container spacing={4}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card elevation={3}>
                <CardContent style={{ textAlign: 'center' }}>
                  <Avatar
                    src={doctor.image}
                    alt={doctor.name}
                    sx={{ width: 80, height: 80, margin: '0 auto 1rem' }}
                  />
                  <Typography variant="h6">{doctor.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialty}
                  </Typography>
                  {doctor.verified && (
                    <Chip
                      icon={<Verified />}
                      label="Verified"
                      color="success"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                  <Button variant="contained" sx={{ mt: 2 }} fullWidth>
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, mx: 'auto' }}>
            No doctors found matching the filters.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default RemoteDoctor;
