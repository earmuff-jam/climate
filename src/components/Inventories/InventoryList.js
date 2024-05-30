import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import { Box, Container } from '@mui/material';
import AddInventoryWithStepper from './AddInventoryWithStepper';
import { AddRounded, LibraryAddRounded } from '@mui/icons-material';
import AddBulkUploadInventory from './AddBulkUploadInventory';
import HeaderWithButton from '@/util/HeaderWithButton';
import InventoriesTable from './InventoriesTable';
import { VIEW_INVENTORY_LIST_HEADERS } from './constants';
import { useFetchInventoriesList } from '@/features/inventories';

const InventoryList = () => {
  const { data, isLoading } = useFetchInventoriesList();
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
        {/* bookmarked inventories section */}
        <HeaderWithButton
          title='Bookmarked Inventories'
          showSecondaryTitle={true}
          secondaryTitle={'View all your inventories'}
          showRedirectLink={true}
          redirectTo={'/inventories/list'}
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
        {/* bookmarked inventories has less column headers */}
        <InventoriesTable
          isLoading={isLoading}
          data={data}
          columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter(
            (v) => v.displayConcise
          )}
        />
      </Container>
      {displayModal && (
        <SimpleModal
          title={'Add New Item'}
          handleClose={handleCloseAddSingleInventoryItem}
          showSubmit={false}
        >
          <AddInventoryWithStepper
            handleClose={handleCloseAddSingleInventoryItem}
          />
        </SimpleModal>
      )}
      {displayBulkUpload && (
        <SimpleModal
          title={'Add Bulk Item'}
          handleClose={handleCloseAddBulkInventoryItem}
          showSubmit={false}
          maxSize={'md'}
        >
          <AddBulkUploadInventory
            handleClose={handleCloseAddBulkInventoryItem}
          />
        </SimpleModal>
      )}
    </Box>
  );
};

export default InventoryList;
