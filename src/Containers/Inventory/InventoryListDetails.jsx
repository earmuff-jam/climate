import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  CheckRounded,
  CircleRounded,
  CloseRounded,
  GridViewRounded,
  ViewListRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import SimpleModal from '../../util/SimpleModal';
import HeaderWithButton from '../../util/HeaderWithButton';
import { VIEW_INVENTORY_LIST_HEADERS } from '../../Components/InventoryDetails/constants';
import SelectedRowItem from '../../Components/InventoryDetails/SelectedRowItem';
import TableComponent from '../../Components/InventoryDetails/TableComponent';
import AddInventory from '../../Components/AddInventory/AddInventory';
import AddBulkUploadInventory from '../../Components/AddInventory/AddBulkUploadInventory';
import { useDeleteSelectedInventory, useFetchInventoriesList } from '../../features/inventories';
import AssignCategory from '../../Components/CategoryDetails/AssignCategory';
import AssignPlan from '../../Components/Maintenance/AssignPlan';
import { ConfirmationBoxModal, generateTitleColor } from '../../util/util';
import GridComponent from '../../Components/InventoryDetails/GridComponent';
import { useFetchProfileConfigDetails } from '../../features/profile';
import AssignCategoryMaintenanceButton from '../../util/AssignCategoryMaintenanceButton';

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

const InventoryListDetails = ({ displayAllInventories, hideActionMenu }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchInventoriesList();
  const { data: userConfigDetails } = useFetchProfileConfigDetails();
  const deleteSelectedInventoryMutation = useDeleteSelectedInventory();

  const [options, setOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]); // to display more details
  const [rowSelected, setRowSelected] = useState([]); // this is for checkbox and associated events
  const [gridMode, setGridMode] = useState(userConfigDetails.inventory_layout || false);

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const [modalState, setModalState] = useState(MODAL_STATE.NONE);

  const handleCloseModal = () => setModalState(MODAL_STATE.NONE);
  const handleAddCategory = () => setModalState(MODAL_STATE.ASSIGN_CATEGORY);
  const handleAddInventory = () => setModalState(MODAL_STATE.ASSIGN_MAINTENANCE_PLAN);
  const handleDisplayAddSingleInventoryModal = () => setModalState(MODAL_STATE.ADD_ITEM);
  const handleDisplayAddBulkInventoryModal = () => setModalState(MODAL_STATE.BULK_ITEM);

  // checkbox actions
  const handleRowSelection = (_, id) => {
    if (id === 'all') {
      if (rowSelected.length === 0) {
        setRowSelected(data.map((v) => v.id));
      } else {
        setRowSelected([]);
      }
    } else {
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
    }
  };

  const rowFormatter = (row, column, color) => {
    if (['created_on', 'updated_on'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    if (['price', 'quantity'].includes(column)) {
      return row[column] <= 0 ? '-' : row[column];
    }
    if (['updator_name', 'creator_name'].includes(column)) {
      return row[column]?.username ?? '-';
    }
    if (['is_returnable'].includes(column)) {
      return row[column] ? <CheckRounded color="primary" /> : <CloseRounded color="error" />;
    }
    if (['name'].includes(column)) {
      return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={{ xs: 1 }}>
          <CircleRounded sx={{ height: '0.75rem', width: '0.75rem', color: color ? `${color}` : 'transparent' }} />
          <Typography variant="subtitle2">{row[column] || '-'}</Typography>
        </Stack>
      );
    }
    return row[column] ?? '-';
  };

  const onRowSelect = (row) => {
    setModalState(MODAL_STATE.MORE_DETAILS);
    setSelectedRow(row);
  };

  const resetSelection = () => {
    handleCloseModal();
  };

  const handleDeleteInventory = () => {
    setOpenDialog(true);
    setIdToDelete(rowSelected);
  };

  const reset = () => {
    setOpenDialog(false);
    setRowSelected([]);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    deleteSelectedInventoryMutation.mutate(rowSelected);
    reset();
  };

  const handleEdit = (itemID) => {
    navigate(`/inventories/${itemID}/update`);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setOptions(data);
    }
  }, [isLoading]);

  return (
    <>
      <Container maxWidth="xl">
        <HeaderWithButton
          title={`${displayAllInventories ? 'Inventories' : 'Recently edited'}`}
          secondaryTitle={`${
            displayAllInventories ? 'Select item/s to assign category or maintenance plan' : 'View all your inventories'
          }`}
          showRedirectLink={!displayAllInventories}
          redirectTo="/inventories/list"
        >
          {displayAllInventories ? (
            <>
              <AssignCategoryMaintenanceButton
                options={[
                  { label: 'Add Item', action: handleDisplayAddSingleInventoryModal },
                  { label: 'Upload bulk', action: handleDisplayAddBulkInventoryModal },
                  {
                    label: 'Assign category',
                    action: handleAddCategory,
                    disabled: !rowSelected.length || !displayAllInventories,
                  },
                  {
                    label: 'Assign maintenance plan',
                    action: handleAddInventory,
                    disabled: !rowSelected.length || !displayAllInventories,
                  },
                  {
                    label: 'Delete inventory',
                    action: handleDeleteInventory,
                    disabled: !rowSelected.length || !displayAllInventories,
                  },
                ]}
              />
              <Tooltip title={gridMode ? 'view in list mode' : 'view in grid mode'}>
                <IconButton onClick={() => setGridMode(!gridMode)}>
                  {gridMode ? <ViewListRounded /> : <GridViewRounded />}
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </HeaderWithButton>
        {displayAllInventories ? (
          <Autocomplete
            sx={{ maxWidth: '20rem', mb: 1 }}
            id="inventory-items-autocomplete"
            options={options}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              if (newValue) {
                setOptions(data.filter((option) => option.id === newValue.id));
              } else {
                setOptions(data);
              }
            }}
            renderInput={(params) => <TextField variant="standard" {...params} label="Search ..." />}
          />
        ) : null}
        {displayAllInventories && gridMode ? (
          <GridComponent
            isLoading={isLoading}
            data={options}
            rowSelected={rowSelected}
            handleEdit={handleEdit}
            handleRowSelection={handleRowSelection}
            handleAddCategory={handleAddCategory}
            handleAddInventory={handleAddInventory}
            handleDeleteInventory={handleDeleteInventory}
          />
        ) : (
          <TableComponent
            isLoading={isLoading}
            hideActionMenu={hideActionMenu}
            data={displayAllInventories ? options : options?.filter((_, index) => index < 3)}
            columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
            rowFormatter={rowFormatter}
            generateTitleColor={generateTitleColor}
            rowSelected={rowSelected}
            onRowSelect={onRowSelect}
            handleRowSelection={handleRowSelection}
            handleEdit={handleEdit}
          />
        )}
      </Container>
      {modalState === MODAL_STATE.ADD_ITEM && (
        <SimpleModal title="Add New Item" handleClose={handleCloseModal}>
          <AddInventory handleClose={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.BULK_ITEM && (
        <SimpleModal title="Add Bulk Item" handleClose={handleCloseModal} maxSize="md">
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              View item details
              <IconButton aria-label="close" onClick={resetSelection} color="error">
                <CloseRounded />
              </IconButton>
            </Stack>
          </DialogTitle>
          <SelectedRowItem selectedRow={selectedRow} columns={Object.values(VIEW_INVENTORY_LIST_HEADERS)} />
        </Dialog>
      )}
      {modalState === MODAL_STATE.ASSIGN_CATEGORY && (
        <SimpleModal title="Assign category" handleClose={handleCloseModal} maxSize="md">
          <AssignCategory rowSelected={rowSelected} handleCloseAssignFn={handleCloseModal} />
        </SimpleModal>
      )}
      {modalState === MODAL_STATE.ASSIGN_MAINTENANCE_PLAN && (
        <SimpleModal
          title="Assign maintenance plan"
          subtitle="Create or add new maintenance plans"
          redirectSubtitle={true}
          subtitleLinkTo="/maintenance"
          handleClose={handleCloseModal}
          maxSize="md"
        >
          <AssignPlan rowSelected={rowSelected} handleCloseAssignFn={handleCloseModal} />
        </SimpleModal>
      )}
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        text="Confirm deletion of selected item(s) ? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={reset}
        maxSize="sm"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default InventoryListDetails;
