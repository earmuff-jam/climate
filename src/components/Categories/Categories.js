import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { VIEW_INVENTORY_CATEGORIES } from '../Inventories/constants';
import { TrendingUpRounded } from '@mui/icons-material';

const Categories = () => {
  return (
    <Grid container spacing={4}>
      {VIEW_INVENTORY_CATEGORIES.map((item, index) => (
        <Grid item key={item.name} xs={12} sm={6} md={4}>
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
                  <IconButton disabled>{item.icon}</IconButton>
                  <Stack>
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
                          ${item.expensesInPercent}%
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
