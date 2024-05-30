import React from 'react';
import { Box } from '@mui/material';
import AddInventoryStepper from './AddInventoryStepper';

const AddInventoryWithStepper = ({ handleClose }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <AddInventoryStepper handleClose={handleClose} />
    </Box>
  );
};

export default AddInventoryWithStepper;
