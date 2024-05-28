import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import InventoriesLearnMoreSection from './InventoriesLearnMoreSection';

export default function Collection(props) {
  const { title } = props;
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth='lg'>
        <Typography variant='h4' component='h2' gutterBottom>
          {title}
        </Typography>
        <InventoriesLearnMoreSection />
      </Container>
    </Box>
  );
}
