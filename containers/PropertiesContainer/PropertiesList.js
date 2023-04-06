import { Box, Button, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PropertyList = ({ properties, handleAddProperty }) => {

  return (
    <Box sx={{ p: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid item>
          <Typography variant="h5">My Properties</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddProperty}>
            Add Property
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default PropertyList;
