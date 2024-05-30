import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Skeleton,
  Stack,
  Divider,
} from '@mui/material';

import {
  BLANK_PROFILE_DETAILS,
  BLANK_PROFILE_DETAILS_ERROR,
} from './constants';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useUser } from '@supabase/auth-helpers-react';
import {
  useFetchProfileDetails,
  useUpsertProfileDetails,
} from '@/features/profile';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const ProfileContent = () => {
  const user = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFetchProfileDetails();
  const upsertProfileDetailsMutation = useUpsertProfileDetails();

  const [editedProfileDetails, setEditedProfileDetails] = useState(
    BLANK_PROFILE_DETAILS
  );
  const [editProfileDetailsError, setEditProfileDetailsError] = useState({
    ...BLANK_PROFILE_DETAILS_ERROR,
  });

  const submit = (ev) => {
    ev.preventDefault();
    const draftFormattedData = { ...editedProfileDetails };
    draftFormattedData['updated_on'] = dayjs();
    draftFormattedData['updated_by'] = user.id;

    upsertProfileDetailsMutation.mutate(draftFormattedData, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['profileDetails']);
        setEditedProfileDetails({ ...response.data });
        router.push('/inventories');
      },
    });
  };

  const handleChange = (ev) => {
    const { id, value } = ev.target;
    const draftEditedProfileData = { ...editedProfileDetails };
    draftEditedProfileData[id] = value;

    const draftErrorElements = { ...editProfileDetailsError };
    let errorFound = false;

    for (const validator of draftErrorElements[id].validators) {
      if (validator.validate(value)) {
        draftErrorElements[id] = {
          ...draftErrorElements[id],
          errorMsg: validator.message,
        };
        errorFound = true;
        break;
      }
    }

    if (!errorFound) {
      draftErrorElements[id] = {
        ...draftErrorElements[id],
        errorMsg: '',
      };
    }
    setEditedProfileDetails({ ...draftEditedProfileData });
    setEditProfileDetailsError(draftErrorElements);
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      setEditedProfileDetails(data);
    }
    // eslint-disable-next-line
  }, [isLoading]);

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
          value={editedProfileDetails?.username || ''}
          onChange={handleChange}
          variant='outlined'
          size='small'
          error={Boolean(editProfileDetailsError.username['errorMsg'].length)}
          helperText={editProfileDetailsError.username['errorMsg']}
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
          value={editedProfileDetails?.first_name}
          onChange={handleChange}
          variant='outlined'
          size='small'
          error={Boolean(editProfileDetailsError.first_name['errorMsg'].length)}
          helperText={editProfileDetailsError.first_name['errorMsg']}
        />
        <Typography variant='body1' fontWeight={'bold'}>
          Last name
        </Typography>
        <TextField
          fullWidth
          id='last_name'
          name='last_name'
          placeholder='Last name'
          value={editedProfileDetails?.last_name}
          onChange={handleChange}
          variant='outlined'
          size='small'
          error={Boolean(editProfileDetailsError.last_name['errorMsg'].length)}
          helperText={editProfileDetailsError.last_name['errorMsg']}
        />

        <Typography variant='body1' fontWeight={'bold'}>
          Bio
        </Typography>
        <TextField
          fullWidth
          id='bio'
          name='bio'
          placeholder='Couple of words to describe yourself.'
          value={editedProfileDetails?.bio}
          onChange={handleChange}
          variant='outlined'
          multiline={true}
          rows={4}
          size='small'
          error={Boolean(editProfileDetailsError.bio['errorMsg'].length)}
          helperText={editProfileDetailsError.bio['errorMsg']}
        />

        <Typography variant='body1'>
          {editedProfileDetails?.updated_on === null
            ? `Created ${dayjs(editedProfileDetails?.created_on).fromNow()}`
            : `Last updated ${dayjs(
                editedProfileDetails?.updated_on
              ).fromNow()}`}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant='outlined'
            color='primary'
            onClick={submit}
            disabled={Object.values(editProfileDetailsError).some(
              (v) => v.errorMsg.length > 0
            )}
          >
            Update profile
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default ProfileContent;
