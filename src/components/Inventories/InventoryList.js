import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import AddInventoryWithStepper from '../../components/Inventories/AddInventoryWithStepper';
import { DisplayNoMatchingRecordsComponent } from '@/util/util';
import { AddRounded, LibraryAddRounded } from '@mui/icons-material';
import AddBulkUploadInventory from './AddBulkUploadInventory';

const InventoryList = () => {
  // list of inventories
  const [data, setData] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayBulkUpload, setDisplayBulkUpload] = useState(false);

  const handleCloseAddSingleInventoryItem = () => setDisplayModal(false);
  const handleCloseAddBulkInventoryItem = () => setDisplayBulkUpload(false);

  const handleDisplayAddSingleInventoryModal = () =>
    setDisplayModal(!displayModal);
  const handleDisplayAddBulkInventoryModal = () =>
    setDisplayBulkUpload(!displayBulkUpload);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='lg'>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={4}
        >
          <Typography variant='h4' component='h2'>
            Bookmarked Inventories
          </Typography>
          <Stack direction='row' spacing={2} useFlexGap>
            <Button
              color='primary'
              variant='outlined'
              onClick={handleDisplayAddSingleInventoryModal}
              startIcon={<AddRounded />}
            >
              Add Item
            </Button>
            <Button
              color='primary'
              variant='outlined'
              onClick={handleDisplayAddBulkInventoryModal}
              startIcon={<LibraryAddRounded />}
            >
              Upload bulk
            </Button>
          </Stack>
        </Box>
        {data === null || data?.length === 0 ? (
          <DisplayNoMatchingRecordsComponent />
        ) : null}
      </Container>
      {displayModal && (
        <SimpleModal
          title={'Add New Item'}
          handleClose={handleCloseAddSingleInventoryItem}
          showSubmit={false}
        >
          <AddInventoryWithStepper />
        </SimpleModal>
      )}
      {displayBulkUpload && (
        <SimpleModal
          title={'Add Bulk Item'}
          handleClose={handleCloseAddBulkInventoryItem}
          showSubmit={false}
        >
          <AddBulkUploadInventory />
        </SimpleModal>
      )}
    </Box>
  );
};

export default InventoryList;
