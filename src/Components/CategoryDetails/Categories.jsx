import { useDeleteSelectedCategory, useFetchCategoryList } from '../../features/categories';
import { Box, Card, CardContent, Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteRounded, TrendingUpRounded } from '@mui/icons-material';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../../util/util';
import { useState } from 'react';

const Categories = () => {
  const { data, isLoading } = useFetchCategoryList();
  const deleteCategoryMutation = useDeleteSelectedCategory();

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const reset = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      // unknown id to delete. protect from confirmation box
      return;
    }
    deleteCategoryMutation.mutate(id);
    reset();
  };

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  }
  if (data.length <= 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <Grid container spacing={4}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Tooltip title={item.category_description}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Stack direction={'row'}>
                  <IconButton disabled>{item.icon}</IconButton>
                  <Stack flexGrow={1}>
                    <Typography variant="h6" component="h3">
                      {item.category_name}
                    </Typography>
                    <Box sx={{ px: 1, py: 0, borderRadius: 2 }}>
                      <Stack direction={'row'} alignItems={'center'} useFlexGap spacing={1}>
                        <TrendingUpRounded color={index % 2 == 0 ? 'success' : 'error'} />
                        <Typography variant="caption">Total {item?.totalAssignedItems.length ?? 0} items</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  {item.is_deleteable && (
                    <IconButton onClick={() => item?.is_deleteable && handleDelete(item.id)}>
                      <DeleteRounded />
                    </IconButton>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        text="Confirm deletion of selected category ? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={reset}
        showSubmit={false}
        maxSize={'sm'}
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </Grid>
  );
};

export default Categories;
