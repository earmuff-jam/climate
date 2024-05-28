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
import { DarkModeRounded } from '@mui/icons-material';

const AppearanceSettings = () => {
  const [displayMode, setDisplayMode] = useState(false); // false denotes light mode

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
              checked={displayMode}
              onChange={() => setDisplayMode(!displayMode)}
              color='primary'
            />
          }
          label={
            <Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <DarkModeRounded
                  color={displayMode ? 'primary' : 'secondary'}
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

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant='outlined' color='primary' onClick={() => {}} disabled>
          Save
        </Button>
      </Box>
    </>
  );
};
export default AppearanceSettings;
