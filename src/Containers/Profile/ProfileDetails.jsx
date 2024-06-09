import { useState } from 'react';
import { Container, Typography, Divider, Box, Stack } from '@mui/material';
import ProfileDrawer from './ProfileDrawer';
import ProfileContent from './ProfileContent';
import AccountContent from '../../Components/Profile/AccountContent';
import NotificationsContent from '../ProfileNotification/NotificationsContent';
import AppearanceSettings from './AppearanceSettings';

const displaySelection = (rowToDisplay) => {
  switch (rowToDisplay) {
    case 0:
      return <ProfileContent />;
    case 1:
      return <AccountContent />;
    case 2:
      return <NotificationsContent />;
    case 3:
      return <AppearanceSettings />;
    default:
      return <ProfileContent />;
  }
};

const ProfileDetails = () => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const handleSelection = (rowToDisplay) => setSelectedRow(rowToDisplay);

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Settings and profile information
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Manage your account and profile details.
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Stack direction={'row'}>
        <ProfileDrawer selectedRow={selectedRow} handleSelection={handleSelection} />
        <Box sx={{ flexGrow: 1 }}>{displaySelection(selectedRow)}</Box>
      </Stack>
    </Container>
  );
};

export default ProfileDetails;
