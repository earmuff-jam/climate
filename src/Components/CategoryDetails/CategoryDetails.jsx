import { useState } from 'react';
import { Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import {
  CircleRounded,
  DeleteRounded,
  HighlightOffRounded,
  RestoreRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent, generateTitleColor } from '../../util/util';
import SimpleModal from '../../util/SimpleModal';
import TableComponent from '../InventoryDetails/TableComponent';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryDetails/constants';
import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { fetchInvItemsForCategory, useDeleteSelectedCategory, useDeleteSelectedItemFromCategory, useFetchCategoryList } from '../../features/categories';
import CategoryChart from '../Chart/CategoryChart';
import dayjs from 'dayjs';

const MODAL_STATE = {
  NONE: 'none',
  ADD_CATEGORY: 'add_category',
  ITEM_SELECTION: 'item_selection',
};

const CategoryDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { data, isLoading } = useFetchCategoryList();
  const deleteSelectedCategory = useDeleteSelectedCategory();
  const deleteSelectedItemFromCategoryMutation = useDeleteSelectedItemFromCategory();

  const [modalState, setModalState] = useState(MODAL_STATE.NONE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery(
    ['categoryList', selectedCategory?.id],
    () => fetchInvItemsForCategory(supabaseClient, user.id, selectedCategory.id),
    {
      enabled: !!selectedCategory?.id,
    }
  );

  const resetSelection = (id) => {
    if (id === -1) {
      return;
    }
    deleteSelectedItemFromCategoryMutation.mutate(id);
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
          {row?.category_item.length > 0 ? (
            <IconButton onClick={() => resetSelection(row.id)}>
              <RestoreRounded color="primary" />
            </IconButton>
          ) : null}
          <CircleRounded sx={{ height: '0.75rem', width: '0.75rem', color: color ? `${color}` : 'transparent' }} />
          <Typography variant="subtitle2">{row[column] || '-'}</Typography>
        </Stack>
      );
    }
    return row[column] ?? '-';
  };

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

  const handleSelection = (item) => {
    setModalState(MODAL_STATE.ITEM_SELECTION);
    setSelectedCategory(item);
  };

  const handleClose = () => {
    setModalState(MODAL_STATE.NONE);
    setSelectedCategory(null);
    setRowSelected([]);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setModalState(MODAL_STATE.NONE);
    setRowSelected([]);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    deleteSelectedCategory.mutate(id);
    resetConfirmationBox();
  };

  if (isLoading) return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent />;

  return (
    <>
      <Stack spacing="2rem">
        <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
          {data.map((item, index) => (
            <Stack key={index} flexGrow={1}>
              <Tooltip title={item.description}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Stack direction="row">
                      <Stack flexGrow={1}>
                        <Typography variant="h6" component="h3">
                          {item.category_name}
                        </Typography>
                        <Typography variant="caption">{item.category_description}</Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          useFlexGap
                          spacing={1}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleSelection(item)}
                        >
                          <TrendingUpRounded color={index % 2 == 0 ? 'success' : 'error'} />
                          <Stack>
                            <Typography variant="caption">Total items {item.totalAssignedItems.length ?? 0}</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                      <IconButton
                        size="small"
                        disableFocusRipple
                        disableRipple
                        onClick={() => {
                          setIdToDelete(item.id);
                          handleDelete(item.id);
                        }}
                      >
                        <HighlightOffRounded />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Tooltip>
            </Stack>
          ))}
        </Stack>
        <CategoryChart data={data} />
      </Stack>
      {modalState === MODAL_STATE.ITEM_SELECTION && (
        <SimpleModal title={`Item(s) under ${selectedCategory?.category_name}`} handleClose={handleClose} maxSize="md">
          <TableComponent
            hideActionMenu
            isCategory
            isLoading={inventoryLoading}
            data={inventoryData?.data || []}
            rowSelected={rowSelected}
            rowFormatter={rowFormatter}
            generateTitleColor={generateTitleColor}
            handleRowSelection={handleRowSelection}
            columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
          />
        </SimpleModal>
      )}
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        text="Confirm deletion of category? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={resetConfirmationBox}
        showSubmit={false}
        maxSize="sm"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default CategoryDetails;
