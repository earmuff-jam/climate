import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AccountCircleRounded, Home, ListAlt, Settings } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const drawerWidth = 280;

const SideNav = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [selectedItem, setSelectedItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    router.push(`/${item}`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const DrawerWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }));

  const NavHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
  }));

  return (
    <Drawer variant="permanent" sx={{ width: drawerWidth }}>
      <DrawerWrapper>
        <NavHeader>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 1 }}>
            PropertyCo
          </Typography>
          <AccountCircleRounded />
        </NavHeader>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem button selected={selectedItem === 'dashboard'} onClick={() => handleItemClick('')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected={selectedItem === 'properties'} onClick={() => handleItemClick('property')}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Properties" />
          </ListItem>
          <ListItem button selected={selectedItem === 'settings'} onClick={() => handleItemClick('settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <AccountCircleRounded sx={{ mr: 1 }} />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          © 2023 PropertyCo All rights reserved.
        </Typography>
      </DrawerWrapper>
    </Drawer>
  );
};

export default SideNav;
