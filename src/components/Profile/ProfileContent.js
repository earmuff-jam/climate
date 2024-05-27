import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Skeleton,
  Stack,
  Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import useFetchProfileDetails from '../../features/profile/fetchProfileDetails';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ProfileContent = () => {
  const submit = () => {};

  const handleChange = () => {};
  const { data, isLoading, isError } = useFetchProfileDetails();

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant='h4' gutterBottom>
          Profile details
        </Typography>
        <Typography variant='caption' gutterBottom>
          Brief details about yourself to help others notice you.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <Typography variant='body1' fontWeight={'bold'}>
          User name
        </Typography>
        <TextField
          fullWidth
          id='username'
          name='username'
          placeholder='User Name'
          value={data?.username || ''}
          onChange={handleChange}
          variant='outlined'
          size='small'
        />
        <Typography variant='caption'>
          Your display name throughout the application.
        </Typography>
        <Typography variant='body1' fontWeight={'bold'}>
          First name
        </Typography>
        <TextField
          fullWidth
          id='first_name'
          name='first_name'
          placeholder='First name'
          value={data?.first_name}
          onChange={handleChange}
          variant='outlined'
          size='small'
        />
        <Typography variant='body1' fontWeight={'bold'}>
          Last name
        </Typography>
        <TextField
          fullWidth
          id='last_name'
          name='last_name'
          placeholder='Last name'
          value={data?.last_name}
          onChange={handleChange}
          variant='outlined'
          size='small'
        />

        <Typography variant='body1' fontWeight={'bold'}>
          Bio
        </Typography>
        <TextField
          fullWidth
          id='bio'
          name='bio'
          placeholder='Couple of words to describe yourself.'
          value={data?.bio}
          onChange={handleChange}
          variant='outlined'
          multiline={true}
          rows={4}
          size='small'
        />

        <Typography variant='body1'>
          {data?.updated_on === null
            ? `Created ${dayjs(data?.created_on).fromNow()}`
            : `Last updated ${dayjs(data?.updated_on).fromNow()}`}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant='outlined' color='primary' onClick={submit}>
            Update profile
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default ProfileContent;
