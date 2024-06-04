import React, { useState } from 'react';
import {
  Box,
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
import {
  DeleteRounded,
  HighlightOffRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '@/util/util';
import {
  useDeleteSelectedMaintenancePlan,
  useFetchMaintenanceList,
} from '@/features/maintenancePlan';

const PlanList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchMaintenanceList();
  const deleteMaintenancePlanMutation = useDeleteSelectedMaintenancePlan();

  const handleDelete = (id) => {
    deleteMaintenancePlanMutation.mutate(id, {
      onSettled: (response) => {
        queryClient.invalidateQueries(['maintenancePlanDetails']);
      },
    });
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
                      sx={{ px: 1, py: 0, borderRadius: 2, maxWidth: '4rem' }}
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
                          ${item.total_items ?? 0}%
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <IconButton
                    disableFocusRipple
                    disableRipple
                    onClick={() => handleDelete(item.id)}
                  >
                    <HighlightOffRounded />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlanList;
