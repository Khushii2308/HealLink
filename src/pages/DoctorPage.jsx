import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { Verified } from '@mui/icons-material';

const doctors = [
  {
    name: 'Dr. Anjali Verma',
    specialty: 'General Physician',
    image: '/doctors/anjali.jpg',
    verified: true,
  },
  {
    name: 'Dr. Rohan Mehta',
    specialty: 'Cardiologist',
    image: '/doctors/rohan.jpg',
    verified: true,
  },
  {
    name: 'Dr. Pooja Sharma',
    specialty: 'Pediatrician',
    image: '/doctors/pooja.jpg',
    verified: false,
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Dermatologist',
    image: '/doctors/vikram.jpg',
    verified: true,
  },
  {
    name: 'Dr. Nisha Patel',
    specialty: 'Neurologist',
    image: '/doctors/nisha.jpg',
    verified: false,
  },
  {
    name: 'Dr. Rahul Das',
    specialty: 'Orthopedic Surgeon',
    image: '/doctors/rahul.jpg',
    verified: true,
  },
  {
    name: 'Dr. Meera Kapoor',
    specialty: 'Psychiatrist',
    image: '/doctors/meera.jpg',
    verified: true,
  },
  {
    name: 'Dr. Arjun Nair',
    specialty: 'ENT Specialist',
    image: '/doctors/arjun.jpg',
    verified: false,
  },
];

const DoctorPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Doctors
      </Typography>
      <Grid container spacing={4}>
        {doctors.map((doc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4}>
              <CardContent style={{ textAlign: 'center' }}>
                <Avatar
                  src={doc.image}
                  alt={doc.name}
                  sx={{ width: 80, height: 80, margin: '0 auto 1rem' }}
                />
                <Typography variant="h6">{doc.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {doc.specialty}
                </Typography>
                <div style={{ marginTop: 10 }}>
                  {doc.verified && (
                    <Chip
                      icon={<Verified />}
                      label="Verified"
                      color="success"
                      size="small"
                    />
                  )}
                </div>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        

      </Grid><Button 
  variant="outlined" 
  size="small" 
  href="/" 
  sx={{ mt: 2, textTransform: 'none' }}
>
  ← Back to Home
</Button>
    </div>
    
  );
};

export default DoctorPage;
