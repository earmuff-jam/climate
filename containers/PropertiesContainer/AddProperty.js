import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit form data and add a new property
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>Add a New Property</Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div>
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="Rent" name="rent" type="number" value={formData.rent} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="Bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleInputChange} required />
        </div>
        <div>
          <TextField fullWidth label="Bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleInputChange} required />
        </div>
        <div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}> Submit </Button>
        </div>
      </Box>
    </Box>
  );
};

export default AddProperty;