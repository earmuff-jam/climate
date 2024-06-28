import { useState } from 'react';
import { Box, Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { HighlightOffRounded, TrendingUpRounded } from '@mui/icons-material';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../../util/util';
import SimpleModal from '../../util/SimpleModal';
import InventoryTable from '../InventoryDetails/InventoryTable';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryDetails/constants';
import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { fetchInvItemsForCategory, useDeleteSelectedCategory, useFetchCategoryList } from '../../features/categories';
import CategoryChart from '../Chart/CategoryChart';

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

  const [modalState, setModalState] = useState(MODAL_STATE.NONE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery(
    ['categoryList', selectedCategory?.id],
    () => fetchInvItemsForCategory(supabaseClient, user.id, selectedCategory.id),
    {
      enabled: !!selectedCategory?.id,
    }
  );

  const handleSelection = (item) => {
    setModalState(MODAL_STATE.ITEM_SELECTION);
    setSelectedCategory(item);
  };

  const handleClose = () => {
    setModalState(MODAL_STATE.NONE);
    setSelectedCategory(null);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setModalState(MODAL_STATE.NONE);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    deleteSelectedCategory.mutate(id);
    resetConfirmationBox();
  };

  if (isLoading) return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent />;

  return (
    <>
      <Stack spacing={'2rem'}>
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
                    <Stack direction={'row'}>
                      <Stack flexGrow={1}>
                        <Typography variant="h6" component="h3">
                          {item.category_name}
                        </Typography>
                        <Typography variant="caption">{item.category_description}</Typography>
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
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
      {/* display list of inventories associated with the selected maintenance plan when selected */}
      {modalState === MODAL_STATE.ITEM_SELECTION && (
        <SimpleModal
          title={`Item(s) under ${selectedCategory?.category_name}`}
          handleClose={handleClose}
          maxSize={'md'}
        >
          <InventoryTable
            plainView={true}
            isCategory={true}
            isLoading={inventoryLoading}
            data={inventoryData?.data || []}
            rowSelected={[]}
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
        maxSize={'sm'}
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default CategoryDetails;
