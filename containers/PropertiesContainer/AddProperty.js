import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EncourageUsers from './EncourageUsers';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
  },
  paper: {
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});

const AddProperty = () => {
  const classes = useStyles();

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
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <EncourageUsers />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ minHeight: 'calc(100vh - 64px)', }}>
          <Box component='form' onSubmit={handleSubmit} className={classes.form}>
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
              <Button type="submit" variant="contained" sx={{ mt: 2, display: 'flex' }}> Submit </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProperty;
