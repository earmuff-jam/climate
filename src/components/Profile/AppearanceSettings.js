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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { DarkModeRounded, WarningRounded } from '@mui/icons-material';

const AppearanceSettings = () => {
  const [appearanceSetting, setAppearanceSetting] = useState({
    dark_mode: {
      name: 'dark_mode',
      is_dark_mode_enabled: false,
    },
  });

  const handleCheckbox = () => {};

  const submit = () => {};
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant='h4' gutterBottom>
          Appearance Settings
        </Typography>
        <Typography variant='caption' gutterBottom>
          Change the look and feel of the application. Switch between dark mode
          and light mode if needed.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={appearanceSetting.dark_mode.is_dark_mode_enabled}
              onChange={(e) => handleCheckbox('dark_mode', e.target.checked)}
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <DarkModeRounded
                  color={
                    appearanceSetting.dark_mode.is_dark_mode_enabled
                      ? 'primary'
                      : 'secondary'
                  }
                />
                <Typography variant='caption'>Enable dark mode</Typography>
              </Stack>
              <Typography variant='caption' gutterBottom>
                Switch to dark mode.
              </Typography>
            </Stack>
          }
        />
      </Stack>
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
export default AppearanceSettings;
