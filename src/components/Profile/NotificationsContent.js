import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  AssignmentLateRounded,
  BookmarkRounded,
  SettingsSuggestRounded,
} from '@mui/icons-material';

const NotificationsContent = () => {
  const submit = () => {};

  const [notificationSetting, setNotificationSetting] = useState({
    bookmarkedItems: {
      name: 'bookmarked_items',
      is_notification_enabled: false,
    },
    itemsDue: {
      name: 'items_due',
      is_items_due_enabled: true,
    },
    system_settings: {
      name: 'system_settings',
      is_system_settings_enabled: true,
    },
  });

  const handleCheckbox = () => {};

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
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={
                notificationSetting.bookmarkedItems.is_notification_enabled
              }
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
                  color={
                    notificationSetting.is_notification_enabled
                      ? 'primary'
                      : 'secondary'
                  }
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
              checked={notificationSetting.itemsDue.is_items_due_enabled}
              onChange={(e) => handleCheckbox('items_due', e.target.checked)}
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <AssignmentLateRounded
                  color={
                    notificationSetting.itemsDue.is_items_due_enabled
                      ? 'warning'
                      : 'secondary'
                  }
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
              checked={
                notificationSetting.system_settings.is_system_settings_enabled
              }
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
                  color={
                    notificationSetting.system_settings
                      .is_system_settings_enabled
                      ? 'primary'
                      : 'secondary'
                  }
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
