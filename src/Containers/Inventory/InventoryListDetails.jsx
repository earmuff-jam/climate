import React, { useState } from 'react';
import { Box, Button, Container, Dialog, DialogTitle, IconButton, Slide, Stack } from '@mui/material';
import {
  AddRounded,
  CategoryRounded,
  CloseRounded,
  DeleteSweepRounded,
  LibraryAddRounded,
  SettingsSuggestRounded,
} from '@mui/icons-material';
import HeaderWithButton from '../../util/HeaderWithButton';
import SimpleModal from '../../util/SimpleModal';
import { VIEW_INVENTORY_LIST_HEADERS } from '../../Components/InventoryDetails/constants';
import SelectedRowItem from '../../Components/InventoryDetails/SelectedRowItem';
import InventoryTable from '../../Components/InventoryDetails/InventoryTable';
import AddInventory from '../../Components/AddInventory/AddInventory';
import AddBulkUploadInventory from '../../Components/AddInventory/AddBulkUploadInventory';
import { useDeleteSelectedInventory, useFetchInventoriesList } from '../../features/inventories';
import AssignCategory from '../../Components/CategoryDetails/AssignCategory';
import AssignPlan from '../../Components/Maintenance/AssignPlan';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const MODAL_STATE = {
  NONE: 'none',
  ADD_ITEM: 'item',
  BULK_ITEM: 'bulk',
  MORE_DETAILS: 'more',
  ASSIGN_CATEGORY: 'assign_category',
  ASSIGN_MAINTENANCE_PLAN: 'assign_maintenance_plan',
};

const InventoryListDetails = ({ displayAllInventories }) => {
  const { data, isLoading } = useFetchInventoriesList();
  const deleteSelectedInventoryMutation = useDeleteSelectedInventory();
  const [selectedRow, setSelectedRow] = useState([]);
  const [rowSelected, setRowSelected] = useState([]); // this is for checkbox and associated events
  const [modalState, setModalState] = useState(MODAL_STATE.NONE);

  const handleCloseModal = () => setModalState(MODAL_STATE.NONE);
  const handleAddCategory = () => setModalState(MODAL_STATE.ASSIGN_CATEGORY);
  const handleAddInventory = () => setModalState(MODAL_STATE.ASSIGN_MAINTENANCE_PLAN);
  const handleDisplayAddSingleInventoryModal = () => setModalState(MODAL_STATE.ADD_ITEM);
  const handleDisplayAddBulkInventoryModal = () => setModalState(MODAL_STATE.BULK_ITEM);

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
      draftSelected = draftSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
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

  const handleDeleteInventory = () => {
    deleteSelectedInventoryMutation.mutate(rowSelected);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth={displayAllInventories ? 'xl' : 'lg'}>
        {/* bookmarked inventories section */}
        {displayAllInventories ? (
          <HeaderWithButton
            title="Inventories"
            showSecondaryTitle={true}
            secondaryTitle={'Select item/s to assign category or maintenance plan'}
            showPrimaryButton={true}
            primaryButtonVariant={'outlined'}
            primaryButtonColor={'primary'}
            primaryButtonTextLabel={'Add Item'}
            showPrimaryStartIcon={true}
            primaryStartIcon={<AddRounded />}
            showSecondaryButton={true}
            secondaryButtonVariant={'outlined'}
            secondaryButtonTextLabel={'Upload bulk'}
            secondaryButtonColor="primary"
            showSecondaryStartIcon={true}
            secondaryStartIcon={<LibraryAddRounded />}
            handleClickPrimaryButton={handleDisplayAddSingleInventoryModal}
            handleClickSecondaryButton={handleDisplayAddBulkInventoryModal}
          />
        ) : (
          <HeaderWithButton
            title="Bookmarked Inventories"
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
            secondaryButtonColor="primary"
            showSecondaryStartIcon={true}
            secondaryStartIcon={<LibraryAddRounded />}
            handleClickPrimaryButton={handleDisplayAddSingleInventoryModal}
            handleClickSecondaryButton={handleDisplayAddBulkInventoryModal}
          />
        )}

        {displayAllInventories && rowSelected.length > 0 ? (
          <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
            <Button color={'primary'} variant={'outlined'} onClick={handleAddCategory} startIcon={<CategoryRounded />}>
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
            <IconButton onClick={handleDeleteInventory}>
              <DeleteSweepRounded color="error" />
            </IconButton>
          </Stack>
        ) : null}

        {/* bookmarked inventories has less column headers */}
        <InventoryTable
          isLoading={isLoading}
          data={displayAllInventories ? data?.result : data?.bookmarkedItems}
          columns={
            displayAllInventories
              ? Object.values(VIEW_INVENTORY_LIST_HEADERS)
              : Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)
          }
          rowSelected={rowSelected}
          handleRowSelection={handleRowSelection}
          onRowSelect={onRowSelect}
        />
      </Container>
      {modalState === MODAL_STATE.ADD_ITEM && (
        <SimpleModal title={'Add New Item'} handleClose={handleCloseModal} showSubmit={false}>
          <AddInventory handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.BULK_ITEM && (
        <SimpleModal title={'Add Bulk Item'} handleClose={handleCloseModal} showSubmit={false} maxSize={'md'}>
          <AddBulkUploadInventory handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.MORE_DETAILS && (
        <Dialog
          open
          keepMounted
          onClose={resetSelection}
          aria-labelledby="detailed-inventory-item"
          scroll="paper"
          TransitionComponent={Transition}
          sx={{
            '& .MuiDialog-container': {
              justifyContent: 'flex-end',
            },
          }}
        >
          <DialogTitle>
            <Stack direction="row" justifyContent={'space-between'} alignItems={'center'}>
              View item details
              <IconButton aria-label="close" onClick={resetSelection} color="error">
                <CloseRounded />
              </IconButton>
            </Stack>
          </DialogTitle>
          <SelectedRowItem selectedRow={selectedRow} columns={Object.values(VIEW_INVENTORY_LIST_HEADERS)} />
        </Dialog>
      )}
      {/* assign category to selected inventory */}
      {modalState === MODAL_STATE.ASSIGN_CATEGORY && (
        <SimpleModal title={'Assign category'} handleClose={handleCloseModal} showSubmit={false} maxSize={'md'}>
          <AssignCategory />
        </SimpleModal>
      )}
      {/* assign maintenance plan to selected inventory */}
      {modalState === MODAL_STATE.ASSIGN_MAINTENANCE_PLAN && (
        <SimpleModal
          title={'Assign maintenance plan'}
          subtitle={'Create or add new maintenance plans'}
          redirectSubtitle={true}
          subtitleLinkTo={'/maintenance'}
          handleClose={handleCloseModal}
          showSubmit={false}
          maxSize={'md'}
        >
          <AssignPlan />
        </SimpleModal>
      )}
    </Box>
  );
};

export default InventoryListDetails;
