import React from 'react';
import { Box } from '@mui/material';
import AddInventoryStepper from './AddInventoryStepper';

const AddInventoryWithStepper = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <AddInventoryStepper />
    </Box>
  );
};

export default AddInventoryWithStepper;
