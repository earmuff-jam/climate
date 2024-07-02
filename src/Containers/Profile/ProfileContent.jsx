import { useEffect, useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { BLANK_PROFILE_DETAILS } from './constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { useQueryClient } from 'react-query';
import { useUser } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileDetails, useUpsertProfileDetails } from '../../features/profile';

dayjs.extend(relativeTime);

const ProfileContent = () => {
  const user = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFetchProfileDetails();
  const upsertProfileDetailsMutation = useUpsertProfileDetails();

  const [formData, setFormData] = useState(BLANK_PROFILE_DETAILS);

  const submit = (ev) => {
    ev.preventDefault();
    const draftFormattedData = Object.entries(formData).reduce((acc, [key, valueObj]) => {
      // handle time differently
      if (['created_on', 'updated_on'].includes(key)) {
        acc[key] = valueObj;
      } else {
        acc[key] = valueObj.value;
      }
      return acc;
    }, {});

    draftFormattedData['id'] = user.id;
    draftFormattedData['updated_on'] = dayjs();
    draftFormattedData['updated_by'] = user.id;

    upsertProfileDetailsMutation.mutate(draftFormattedData, {
      onSuccess: (response) => {
        const selectedProfile = response.data;
        setFormData({ ...selectedProfile });
        queryClient.invalidateQueries(['profileDetails', 'profileConfig']);
        navigate('/');
      },
    });
  };

  const handleChange = (ev) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...formData };
    let errorMsg = '';

    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }

    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      const draftProfileDetails = { ...BLANK_PROFILE_DETAILS };
      draftProfileDetails.username.value = data.username;
      draftProfileDetails.first_name.value = data.first_name;
      draftProfileDetails.last_name.value = data.last_name;
      draftProfileDetails.bio.value = data.bio;
      draftProfileDetails.created_on = data.created_on;
      draftProfileDetails.updated_on = data.updated_on;
      setFormData(draftProfileDetails);
    }
  }, [isLoading]);

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Profile details
        </Typography>
        <Typography variant="caption" gutterBottom>
          Brief details about yourself to help others notice you.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <Typography variant="body1" fontWeight="bold">
          User name
        </Typography>
        <TextField
          fullWidth
          id="username"
          name="username"
          placeholder="User Name"
          value={formData?.username.value || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          error={Boolean(formData.username['errorMsg'].length)}
          helperText={formData.username['errorMsg']}
        />
        <Typography variant="caption">Your display name throughout the application.</Typography>
        <Typography variant="body1" fontWeight="bold">
          First name
        </Typography>
        <TextField
          fullWidth
          id="first_name"
          name="first_name"
          placeholder="First name"
          value={formData?.first_name.value || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          error={Boolean(formData.first_name['errorMsg'].length)}
          helperText={formData.first_name['errorMsg']}
        />
        <Typography variant="body1" fontWeight="bold">
          Last name
        </Typography>
        <TextField
          fullWidth
          id="last_name"
          name="last_name"
          placeholder="Last name"
          value={formData?.last_name.value || ''}
          onChange={handleChange}
          variant="outlined"
          size="small"
          error={Boolean(formData.last_name['errorMsg'].length)}
          helperText={formData.last_name['errorMsg']}
        />

        <Typography variant="body1" fontWeight="bold">
          Bio
        </Typography>
        <TextField
          fullWidth
          id="bio"
          name="bio"
          placeholder="Couple of words to describe yourself."
          value={formData?.bio.value || ''}
          onChange={handleChange}
          variant="outlined"
          multiline={true}
          rows={4}
          size="small"
          error={Boolean(formData.bio['errorMsg'].length)}
          helperText={formData.bio['errorMsg']}
        />

        <Typography variant="body1">
          {formData?.updated_on === null
            ? `Created ${dayjs(formData?.created_on).fromNow()}`
            : `Last updated ${dayjs(formData?.updated_on).fromNow()}`}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={submit}
            disabled={Object.values(formData).some((v) => v?.errorMsg?.length > 0)}
          >
            Update profile
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default ProfileContent;
