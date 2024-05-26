import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import React from 'react';

export const PROFILE_DRAWER_NAVIGATION_ITEMS = [
  'Profile',
  'Account',
  'Notifications',
  'Display',
];

const ProfileDrawer = ({ selectedRow, handleSelection }) => {
  return (
    <Stack
      sx={(theme) => ({
        width: theme.spacing(40),
        [theme.breakpoints.down('md')]: {
          width: '50%',
        },
      })}
    >
      {PROFILE_DRAWER_NAVIGATION_ITEMS.map((v, index) => (
        <List key={index} disablePadding>
          <ListItem onClick={() => handleSelection(index)}>
            <ListItemButton selected={index === selectedRow}>
              <ListItemText primary={v} />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
    </Stack>
  );
};

export default ProfileDrawer;
