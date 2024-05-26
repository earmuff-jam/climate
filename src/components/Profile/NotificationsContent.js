import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { WarningRounded } from '@mui/icons-material';

const NotificationsContent = () => {
  const submit = () => {};

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant='h4' gutterBottom>
          Notfication Center
        </Typography>
        <Typography variant='caption' gutterBottom>
          Setup notifications for alerts regarding your bookmarked inventories.
          Items that are past due in return are also highlighted here.
        </Typography>
        <Divider />
      </Box>
      <Stack sx={{ margin: '0 auto' }}>
        <Card>
          <CardContent>
            <Stack alignItems={'center'}>
              <IconButton>
                <WarningRounded color='warning' />
              </IconButton>
              <Typography>Unable to proceed at this time. </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant='outlined' color='primary' onClick={submit} disabled>
            Save
          </Button>
        </Box>
      </Stack>
    </>
  );
};
export default NotificationsContent;
