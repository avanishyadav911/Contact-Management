import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import baseUrl from '../url.js';

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.firstName || !form.email || !form.phoneNumber) {
      alert('Please fill in required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${baseUrl}/contacts`, form);
      setForm({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' });
      alert('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography 
  variant="h4" 
  gutterBottom 
  sx={{ 
    fontWeight: 'bold', 
    color: 'primary.main', 
    textAlign: 'center', 
    fontFamily: 'Roboto, sans-serif',
    mb: 2 
  }}
>
  Add New Contact
</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <TextField
          label="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          type="tel"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job Title"
          value={form.jobTitle}
          onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Adding...' : 'Add Contact'}
        </Button>
      </Box>
    </Container>
  );
};

export default ContactForm;
