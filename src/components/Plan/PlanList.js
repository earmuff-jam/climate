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
import {
  useDeleteSelectedCategory,
  useFetchCategoryList,
} from '@/features/categories';

import { useQueryClient } from 'react-query';
import { VIEW_CATEGORY_LIST } from './constants';
import {
  DeleteRounded,
  HighlightOffRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '@/util/util';

const PlanList = () => {
  const queryClient = useQueryClient();
  //   const { data, isLoading } = useFetchCategoryList();
  //   const deleteCategoryMutation = useDeleteSelectedCategory();

  const handleDelete = (id) => {
    // deleteCategoryMutation.mutate(id, {
    //   onSettled: (response) => {
    //     queryClient.invalidateQueries(['maintenancePlanDetails']);
    //   },
    // });
  };

  //   if (isLoading) {
  //     return (
  //       <Skeleton
  //         variant='rounded'
  //         animation='wave'
  //         height={'100%'}
  //         width={'100%'}
  //       />
  //     );
  //   }

  const [data, setData] = useState([]);

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
                  <Typography variant='h6' component='h3'>
                    {item.name}
                  </Typography>
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
                  <IconButton onClick={() => handleDelete(item.id)}>
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
