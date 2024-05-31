import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
} from '@mui/material';
import AddInventoryWithStepper from './AddInventoryWithStepper';
import {
  AddRounded,
  CloseRounded,
  LibraryAddRounded,
} from '@mui/icons-material';
import AddBulkUploadInventory from './AddBulkUploadInventory';
import HeaderWithButton from '@/util/HeaderWithButton';
import InventoriesTable from './InventoriesTable';
import { VIEW_INVENTORY_LIST_HEADERS } from './constants';
import { useFetchInventoriesList } from '@/features/inventories';
import SelectedRowItem from './SelectedRowItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const InventoryList = () => {
  const { data, isLoading } = useFetchInventoriesList();

  const [selectedRow, setSelectedRow] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayBulkUpload, setDisplayBulkUpload] = useState(false);
  const [displayMoreDetails, setDisplayMoreDetails] = useState(false);

  const handleCloseAddSingleInventoryItem = () => setDisplayModal(false);
  const handleCloseAddBulkInventoryItem = () => setDisplayBulkUpload(false);

  const onRowSelect = (row) => {
    setDisplayMoreDetails(true);
    setSelectedRow(row);
  };

  const resetSelection = () => {
    setDisplayMoreDetails(false);
  };

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
          onRowSelect={onRowSelect}
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
      {displayMoreDetails && (
        <Dialog
          open
          keepMounted
          onClose={resetSelection}
          aria-labelledby='detailed-inventory-item'
          scroll='paper'
          TransitionComponent={Transition}
          sx={{
            '& .MuiDialog-container': {
              justifyContent: 'flex-end',
            },
          }}
        >
          <DialogTitle>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              View item details
              <IconButton
                aria-label='close'
                onClick={resetSelection}
                color='error'
              >
                <CloseRounded />
              </IconButton>
            </Stack>
          </DialogTitle>
          <SelectedRowItem
            selectedRow={selectedRow}
            columns={Object.values(VIEW_INVENTORY_LIST_HEADERS)}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default InventoryList;
