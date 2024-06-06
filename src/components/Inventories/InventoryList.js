import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import {
  Box,
  Button,
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
  AssignmentIndRounded,
  CategoryRounded,
  CloseRounded,
  LibraryAddRounded,
  SettingsSuggestRounded,
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

const MODAL_STATE = {
  NONE: 'none',
  ADD_ITEM: 'item',
  BULK_ITEM: 'bulk',
  MORE_DETAILS: 'more',
  ASSIGN_CATEGORY: 'assign_category',
  ASSIGN_MAINTENANCE_PLAN: 'assign_maintenance_plan',
};

const InventoryList = ({ displayAllInventories }) => {
  const { data, isLoading } = useFetchInventoriesList();
  const [selectedRow, setSelectedRow] = useState([]);
  const [rowSelected, setRowSelected] = useState([]); // this is for checkbox and associated events

  const [modalState, setModalState] = useState(MODAL_STATE.NONE);
  const handleCloseModal = () => setModalState(MODAL_STATE.NONE);

  // handleRowSelection for checkbox actions
  const handleRowSelection = (_, id) => {
    const selectedIndex = rowSelected.indexOf(id);
    let draftSelected = [];

    if (selectedIndex === -1) {
      draftSelected = draftSelected.concat(rowSelected, id);
    } else if (selectedIndex === 0) {
      draftSelected = draftSelected.concat(rowSelected.slice(1));
    } else if (selectedIndex === rowSelected.length - 1) {
      draftSelected = draftSelected.concat(rowSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      draftSelected = draftSelected.concat(
        rowSelected.slice(0, selectedIndex),
        rowSelected.slice(selectedIndex + 1)
      );
    }
    setRowSelected(draftSelected);
  };

  const onRowSelect = (row) => {
    setModalState(MODAL_STATE.MORE_DETAILS);
    setSelectedRow(row);
  };

  const resetSelection = () => {
    handleCloseModal();
  };

  const handleDisplayAddSingleInventoryModal = () =>
    setModalState(MODAL_STATE.ADD_ITEM);
  const handleDisplayAddBulkInventoryModal = () =>
    setModalState(MODAL_STATE.BULK_ITEM);

  const handleAddCategory = () => setModalState(MODAL_STATE.ASSIGN_CATEGORY);
  const handleAddInventory = () =>
    setModalState(MODAL_STATE.ASSIGN_MAINTENANCE_PLAN);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='lg'>
        {/* bookmarked inventories section */}
        {displayAllInventories ? (
          <HeaderWithButton
            title='Inventories'
            showSecondaryTitle={true}
            secondaryTitle={
              'Select item/s to assign category or maintenance plan'
            }
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
        ) : (
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
        )}

        {displayAllInventories && rowSelected.length > 0 ? (
          <Stack direction={'row'} spacing={2}>
            <Button
              color={'primary'}
              variant={'outlined'}
              onClick={handleAddCategory}
              startIcon={<CategoryRounded />}
            >
              Assign category
            </Button>
            <Button
              color={'primary'}
              variant={'outlined'}
              onClick={handleAddInventory}
              startIcon={<SettingsSuggestRounded />}
            >
              Assign maintenance plan
            </Button>
          </Stack>
        ) : null}

        {/* bookmarked inventories has less column headers */}
        <InventoriesTable
          isLoading={isLoading}
          data={displayAllInventories ? data?.result : data?.bookmarkedItems}
          columns={
            displayAllInventories
              ? Object.values(VIEW_INVENTORY_LIST_HEADERS)
              : Object.values(VIEW_INVENTORY_LIST_HEADERS).filter(
                  (v) => v.displayConcise
                )
          }
          rowSelected={rowSelected}
          handleRowSelection={handleRowSelection}
          onRowSelect={onRowSelect}
        />
      </Container>
      {modalState === MODAL_STATE.ADD_ITEM && (
        <SimpleModal
          title={'Add New Item'}
          handleClose={handleCloseModal}
          showSubmit={false}
        >
          <AddInventoryWithStepper handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.BULK_ITEM && (
        <SimpleModal
          title={'Add Bulk Item'}
          handleClose={handleCloseModal}
          showSubmit={false}
          maxSize={'md'}
        >
          <AddBulkUploadInventory handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.MORE_DETAILS && (
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
      {/* assign category to selected inventory */}
      {modalState === MODAL_STATE.ASSIGN_CATEGORY && (
        <SimpleModal
          title={'Assign category'}
          handleClose={handleCloseModal}
          showSubmit={false}
          maxSize={'md'}
        >
          <Box>Assign Category modal</Box>
        </SimpleModal>
      )}
      {/* assign maintenance plan to selected inventory */}
      {modalState === MODAL_STATE.ASSIGN_MAINTENANCE_PLAN && (
        <SimpleModal
          title={'Assign maintenance plan'}
          handleClose={handleCloseModal}
          showSubmit={false}
          maxSize={'md'}
        >
          <Box>Assign maintenance modal</Box>
        </SimpleModal>
      )}
    </Box>
  );
};

export default InventoryList;
