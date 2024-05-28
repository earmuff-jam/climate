import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import { Box, Container } from '@mui/material';
import AddInventoryWithStepper from './AddInventoryWithStepper';
import { AddRounded, LibraryAddRounded } from '@mui/icons-material';
import AddBulkUploadInventory from './AddBulkUploadInventory';
import { useFetchInventoriesList } from '@/features/notifications/notification';
import HeaderWithButton from '@/util/HeaderWithButton';
import InventoriesTable from './InventoriesTable';
import { VIEW_INVENTORY_LIST_HEADERS } from './constants';

const InventoryList = () => {
  // list of inventories
  const { data, isLoading, isError } = useFetchInventoriesList();
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
        {/* inventories section */}
        <HeaderWithButton
          title='Inventories'
          showPrimaryButton={true}
          primaryButtonVariant={'outlined'}
          primaryButtonColor={'primary'}
          primaryButtonTextLabel={'Add Item'}
          showPrimaryStartIcon={true}
          primaryStartIcon={<AddRounded />}
          showSecondaryButton={true}
          secondaryButtonVariant={'outlined'}
          secondaryButtonTextLabel={'Upload bulk'}
          secondaryButtonColor='primary'
          showSecondaryStartIcon={true}
          secondaryStartIcon={<LibraryAddRounded />}
          handleClickPrimaryButton={handleDisplayAddSingleInventoryModal}
          handleClickSecondaryButton={handleDisplayAddBulkInventoryModal}
        />
        <InventoriesTable
          isLoading={isLoading}
          inventoryData={data}
          inventoryColumns={Object.values(VIEW_INVENTORY_LIST_HEADERS)}
        />
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
          maxSize={'md'}
        >
          <AddBulkUploadInventory />
        </SimpleModal>
      )}
    </Box>
  );
};

export default InventoryList;
