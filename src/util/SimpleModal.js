import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const SimpleModal = (props) => {
  const { title, handleClose, children } = props;

  return (
    <Dialog open={true} onClose={handleClose} maxWidth='xl' fullWidth>
      <DialogTitle>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {title}
          <IconButton aria-label='close' onClick={handleClose} color='error'>
            <CloseRounded />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '40rem', overflow: 'auto' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleModal;
