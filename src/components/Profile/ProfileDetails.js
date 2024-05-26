import React, { useState } from 'react';
import {
  Container,
  Typography,
  Divider,
  Box,
  Skeleton,
  Stack,
} from '@mui/material';
import ProfileDrawer from './ProfileDrawer';
import ProfileContent from './ProfileContent';

const displaySelection = (rowToDisplay) => {
  switch (rowToDisplay) {
    case 0:
      return <ProfileContent />;
    default:
      return <ProfileContent />;
  }
};

const ProfileDetails = () => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const handleSelection = (rowToDisplay) => setSelectedRow(rowToDisplay);

  return (
    <Container maxWidth='xl' sx={{ mt: 10 }}>
      <Box>
        <Typography variant='h6' gutterBottom>
          Settings and profile information
        </Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Manage your account and profile details.
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Stack direction={'row'}>
        <ProfileDrawer handleSelection={handleSelection} />
        <Box sx={{ flexGrow: 1 }}>{displaySelection(selectedRow)}</Box>
      </Stack>
    </Container>
  );
};

export default ProfileDetails;
