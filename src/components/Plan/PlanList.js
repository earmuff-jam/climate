import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { useQueryClient } from 'react-query';
import { HighlightOffRounded, TrendingUpRounded } from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '@/util/util';
import {
  useDeleteSelectedMaintenancePlan,
  useFetchMaintenanceList,
} from '@/features/maintenancePlan';
import SimpleModal from '@/util/SimpleModal';

const PlanList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchMaintenanceList();
  const deleteMaintenancePlanMutation = useDeleteSelectedMaintenancePlan();

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const handleDelete = () => {
    setOpenDialog(true);
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
    deleteMaintenancePlanMutation.mutate(id, {
      onSettled: (response) => {
        queryClient.invalidateQueries(['maintenancePlanDetails']);
      },
    });
    reset();
  };

  if (isLoading) {
    return (
      <Skeleton
        variant='rounded'
        animation='wave'
        height={'100%'}
        width={'100%'}
      />
    );
  }

  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent />;

  return (
    <Grid container spacing={4}>
      {[...data].map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Tooltip title={item.description}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Stack direction={'row'}>
                  <Stack flexGrow={1}>
                    <Typography variant='h6' component='h3'>
                      {item.plan}
                    </Typography>
                    <Typography variant='caption'>{item.type}</Typography>

                    <Box
                      sx={{ px: 1, py: 0, borderRadius: 2, maxWidth: '7rem' }}
                      bgcolor={'secondary.main'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        useFlexGap
                        spacing={1}
                      >
                        <TrendingUpRounded
                          color={index % 2 == 0 ? 'success' : 'error'}
                        />
                        <Typography variant='caption'>
                          Total items {item.total_items ?? 0}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <IconButton
                    size='small'
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
        </Grid>
      ))}
      {/* confirmation box */}
      {openDialog && (
        <SimpleModal
          title={'Confirm deletion'}
          handleClose={reset}
          showSubmit={false}
          maxSize={'sm'}
        >
          <Typography variant='caption'>
            Confirm deletion of maintenance plan? Deletion is permanent and
            cannot be undone.
          </Typography>
          <Stack direction={'row'}>
            <Button onClick={reset}>Go back</Button>
            <Button onClick={() => confirmDelete(idToDelete)}>Confirm</Button>
          </Stack>
        </SimpleModal>
      )}
    </Grid>
  );
};

export default PlanList;
