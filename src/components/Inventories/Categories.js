import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { VIEW_INVENTORY_CATEGORIES } from './constants';
import { TrendingUpRounded } from '@mui/icons-material';

const Categories = () => {
  return (
    <Grid container spacing={4}>
      {VIEW_INVENTORY_CATEGORIES.map((item) => (
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
                      <a
                        href={item.href}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {item.name}
                      </a>
                    </Typography>
                    <Box
                      sx={{ p: 0, borderRadius: 2, maxWidth: '5rem' }}
                      bgcolor={'secondary.main'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        useFlexGap
                        spacing={1}
                      >
                        <TrendingUpRounded />
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
