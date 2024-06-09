import React from 'react';
import { useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrimaryAppBar = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    queryClient.removeQueries();
    return;
  };

  const handleClick = () => {
    handleSignOut();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Climate
            </Typography>
          </Box>
          <Stack direction="row">
            {!isUserLoggedIn ? (
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Login
              </Button>
            ) : (
              <Stack direction={'row'}>
                <Button color="inherit" onClick={() => navigate('/')}>
                  Inventories
                </Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>
                  Profile
                </Button>
              </Stack>
            )}
            <Button color="inherit" onClick={() => handleClick(isUserLoggedIn)}>
              {isUserLoggedIn ? 'Sign out' : 'Contact'}
            </Button>
            {!isUserLoggedIn ? (
              <Button variant="outlined" color="inherit" onClick={() => navigate('/profile')}>
                Try for free
              </Button>
            ) : null}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PrimaryAppBar;