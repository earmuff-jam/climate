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

const AccountContent = () => {
  const submit = () => {};

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant='h4' gutterBottom>
          Account details
        </Typography>
        <Typography variant='caption' gutterBottom>
          Earn loyalty points and keep your account up to date.
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
            Update account
          </Button>
        </Box>
      </Stack>
    </>
  );
};
export default AccountContent;
