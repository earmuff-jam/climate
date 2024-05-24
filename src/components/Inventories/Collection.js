import React from 'react';
import { Typography, Container, Box, Stack } from '@mui/material';
import InventoriesLearnMoreSection from './InventoriesLearnMoreSection';
import InventoriesTable from './InventoriesTable';

export default function Collection(props) {
  const { title, displayInventories } = props;
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth='lg'>
        <Typography variant='h4' component='h2' gutterBottom>
          {title}
        </Typography>
        {displayInventories ? (
          <InventoriesTable />
        ) : (
          <InventoriesLearnMoreSection />
        )}
      </Container>
    </Box>
  );
}
