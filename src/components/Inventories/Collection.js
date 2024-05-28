import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import InventoriesLearnMoreSection from './InventoriesLearnMoreSection';
import InventoriesTable from './InventoriesTableWrapper';
import { useFetchInventoriesList } from '@/features/notifications/notification';
import { VIEW_INVENTORY_LIST_HEADERS } from './constants';

export default function Collection(props) {
  const { title, displayInventories } = props;
  // list of inventories
  const { data, isLoading, isError } = useFetchInventoriesList();

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth='lg'>
        <Typography variant='h4' component='h2' gutterBottom>
          {title}
        </Typography>
        {displayInventories ? (
          <InventoriesTable
            isLoading={isLoading}
            inventoryData={data}
            inventoryColumns={Object.values(VIEW_INVENTORY_LIST_HEADERS)}
          />
        ) : (
          <InventoriesLearnMoreSection />
        )}
      </Container>
    </Box>
  );
}
