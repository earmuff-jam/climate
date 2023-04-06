import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
    rating: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Feedback form submission failed.');
      }
      alert('Thank you for your feedback!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: '',
        rating: 0,
      });
    } catch (error) {
      console.error(error);
      alert('Sorry, something went wrong. Please try again later.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Share your feedback</Typography>

      <TextField id="name" name="name" label="Name" value={formData.name} onChange={handleInputChange} required />
      <TextField id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} required />
      <TextField id="subject" name="subject" label="Subject" value={formData.subject} onChange={handleInputChange} required />
      <TextField id="message" name="message" label="Message" multiline rows={4} value={formData.message} onChange={handleInputChange} required />

      <FormControl required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select id="category" name="category" value={formData.category} labelId="category-label" onChange={handleInputChange}>
          <MenuItem value="">-- Select Category --</MenuItem>
          <MenuItem value="Bug Report">Bug Report</MenuItem>
          <MenuItem value="Feature Request">Feature Request</MenuItem>
          <MenuItem value="General Feedback">General Feedback</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputLabel id="rating-label" sx={{ fontWeight: 'bold' }}>How would you rate your experience?</InputLabel>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Slider id="rating" name="rating" min={0} max={5} step={0.5} value={formData.rating} onChange={handleInputChange} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{formData.rating.toFixed(1)}</Typography>
        </Box>
      </Box>

      <Button type="submit" variant="contained" sx={{ alignSelf: 'center', width: 'fit-content' }}>Submit</Button>
    </Box>
  );
};

export default FeedbackForm;
``
