import React from 'react';
import {
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
  Skeleton,
} from '@mui/material';

import {
  AssignmentLateRounded,
  BookmarkRounded,
  SettingsSuggestRounded,
} from '@mui/icons-material';
import useFetchProfileConfigDetails from '../../features/profile/fetchProfileConfigDetails';

const NotificationsContent = () => {
  const submit = () => {};

  const handleCheckbox = () => {};

  const { data, isLoading, isError } = useFetchProfileConfigDetails();

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
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant='h4' gutterBottom>
          Notification Center
        </Typography>
        <Typography variant='caption' gutterBottom>
          Setup notifications for alerts regarding your bookmarked inventories.
          Items that are past due in return are also highlighted here.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.notify_bookmarked_items}
              onChange={(e) =>
                handleCheckbox('is_bookmarked', e.target.checked)
              }
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <BookmarkRounded
                  color={data.notify_bookmarked_items ? 'primary' : 'secondary'}
                />
                <Typography variant='caption'>Bookmarked Items</Typography>
              </Stack>
              <Typography variant='caption' gutterBottom>
                Notify bookmarked inventories items.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.notify_due_items}
              onChange={(e) => handleCheckbox('items_due', e.target.checked)}
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <AssignmentLateRounded
                  color={data.notify_due_items ? 'warning' : 'secondary'}
                />
                <Typography variant='caption'>Due Items</Typography>
              </Stack>
              <Typography variant='caption' gutterBottom>
                Notify inventory items that are due.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.notify_settings_privacy}
              onChange={(e) =>
                handleCheckbox('is_system_settings_enabled', e.target.checked)
              }
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <SettingsSuggestRounded
                  color={data.notify_settings_privacy ? 'primary' : 'secondary'}
                />
                <Typography variant='caption'>
                  Settings and privacy changes.
                </Typography>
              </Stack>
              <Typography variant='caption' gutterBottom>
                Notify when settings and privacy change occurs.
              </Typography>
            </Stack>
          }
        />
      </Stack>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant='outlined' color='primary' onClick={submit} disabled>
          Save
        </Button>
      </Box>
    </>
  );
};
export default NotificationsContent;
