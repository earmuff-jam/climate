import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Skeleton,
  Stack,
} from '@mui/material';
import { useProfileConfig } from './Hooks';

const ProfileContent = () => {
  const { isLoading, profileData, submit, handleChange } = useProfileConfig();
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

  return (
    <Stack spacing={2}>
      <Typography variant='body1'>First name</Typography>
      <TextField
        fullWidth
        id='first_name'
        name='first_name'
        placeholder='First name'
        value={profileData?.first_name}
        onChange={handleChange}
        variant='outlined'
        size='small'
      />
      <Typography variant='body1'>Last name</Typography>
      <TextField
        fullWidth
        id='last_name'
        name='last_name'
        placeholder='Last name'
        value={profileData?.last_name}
        onChange={handleChange}
        variant='outlined'
        size='small'
      />
      <Typography variant='body1'>User name</Typography>
      <TextField
        fullWidth
        id='username'
        name='username'
        placeholder='User Name'
        value={profileData?.username || ''}
        onChange={handleChange}
        variant='outlined'
        size='small'
      />
      <Typography variant='body1'>
        {profileData?.updated_on === null ? 'Created' : 'Last Updated'}
      </Typography>
      <Typography variant='body2'>
        {profileData?.updated_on === null
          ? profileData?.created_on
          : profileData?.updated_on}
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant='outlined' color='primary' onClick={submit}>
          Update profile
        </Button>
      </Box>
    </Stack>
  );
};

export default ProfileContent;
