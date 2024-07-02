import { Box, Button, Checkbox, Divider, FormControlLabel, Skeleton, Stack, Typography } from '@mui/material';
import { DarkModeRounded, GridViewRounded, ViewListRounded } from '@mui/icons-material';
import { useFetchProfileConfigDetails, useUpsertProfileConfigurationDetails } from '../../features/profile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';

const AppearanceSettings = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchProfileConfigDetails();
  const upsertProfileConfigDetailsMutation = useUpsertProfileConfigurationDetails();
  const [displayMode, setDisplayMode] = useState(false);
  const [inventoryLayout, setInventoryLayout] = useState(false); // false is list view

  const handleSubmit = () => {
    const draftFormattedData = {
      id: user?.id,
      display_mode: displayMode,
      inventory_layout: inventoryLayout,
      updated_by: user?.id,
      updated_on: dayjs(),
    };
    upsertProfileConfigDetailsMutation.mutate(draftFormattedData);
    navigate('/');
  };

  useEffect(() => {
    if (!isLoading) {
      setDisplayMode(data?.display_mode);
      setInventoryLayout(data?.inventory_layout);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  }
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Appearance Settings
        </Typography>
        <Typography variant="caption" gutterBottom>
          Change the look and feel of the application. Switch between dark mode and light mode if needed.
        </Typography>
        <Divider />
      </Box>
      <Stack spacing={2}>
        <FormControlLabel
          control={<Checkbox checked={displayMode} onChange={() => setDisplayMode(!displayMode)} color="primary" />}
          label={
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DarkModeRounded color={displayMode ? 'primary' : 'secondary'} />
                <Typography variant="caption">Enable dark mode</Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Switch to dark mode.
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={
            <Checkbox checked={inventoryLayout} onChange={() => setInventoryLayout(!inventoryLayout)} color="primary" />
          }
          label={
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {inventoryLayout ? <ViewListRounded color="primary" /> : <GridViewRounded color="primary" />}
                <Typography variant="caption">
                  Enable {inventoryLayout ? 'list mode' : 'grid mode'} for inventory items
                </Typography>
              </Stack>
              <Typography variant="caption" gutterBottom>
                Switch between list view and grid view for all inventory items.
              </Typography>
            </Stack>
          }
        />
      </Stack>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </>
  );
};
export default AppearanceSettings;
