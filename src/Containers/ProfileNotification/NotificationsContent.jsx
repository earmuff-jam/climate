import { useEffect, useState } from 'react';
import { Typography, Button, Box, Stack, Divider, Checkbox, FormControlLabel, Skeleton } from '@mui/material';
import { AssignmentLateRounded, BookmarkRounded, SettingsSuggestRounded } from '@mui/icons-material';
import { useQueryClient } from 'react-query';
import { BLANK_NOTIFICATION_DETAILS } from './constants';
import { useNavigate } from 'react-router-dom';
import { useFetchProfileConfigDetails, useUpsertProfileConfigurationDetails } from '../../features/profile';

const NotificationsContent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFetchProfileConfigDetails();
  const upsertProfileConfigDetailsMutation = useUpsertProfileConfigurationDetails();

  const [userProfileNotificationSettings, setUserProfileNotificationSettings] = useState({
    ...BLANK_NOTIFICATION_DETAILS,
  });

  const submit = (ev) => {
    ev.preventDefault();
    upsertProfileConfigDetailsMutation.mutate(userProfileNotificationSettings, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['profileConfig']);
        const selectedNotification = response.data.find(Boolean);
        setUserProfileNotificationSettings({ ...selectedNotification });
        navigate('/');
      },
    });
  };

  const handleCheckbox = (selection, value) => {
    const draftFormData = { ...userProfileNotificationSettings };
    draftFormData[selection] = value;
    setUserProfileNotificationSettings(draftFormData);
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      setUserProfileNotificationSettings(data);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  }

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Notification Center
        </Typography>
        <Typography variant="caption" gutterBottom>
          Setup notifications for alerts regarding your bookmarked inventories. Items that are past due in return are
          also highlighted here.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={userProfileNotificationSettings.notify_bookmarked_items}
              onChange={(e) => handleCheckbox('notify_bookmarked_items', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <BookmarkRounded
                  color={userProfileNotificationSettings.notify_bookmarked_items ? 'primary' : 'secondary'}
                />
                <Typography variant="caption">Bookmarked Items</Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Notify bookmarked inventories items.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={userProfileNotificationSettings.notify_due_items}
              onChange={(e) => handleCheckbox('notify_due_items', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <AssignmentLateRounded
                  color={userProfileNotificationSettings.notify_due_items ? 'warning' : 'secondary'}
                />
                <Typography variant="caption">Due Items</Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Notify inventory items that are due.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={userProfileNotificationSettings.notify_settings_privacy}
              onChange={(e) => handleCheckbox('notify_settings_privacy', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <SettingsSuggestRounded
                  color={userProfileNotificationSettings.notify_settings_privacy ? 'primary' : 'secondary'}
                />
                <Typography variant="caption">Settings and privacy changes.</Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Notify when settings and privacy change occurs.
              </Typography>
            </Stack>
          }
        />
      </Stack>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={submit}>
          Save
        </Button>
      </Box>
    </>
  );
};
export default NotificationsContent;
