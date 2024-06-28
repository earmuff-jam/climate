import { useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrimaryAppBar = () => {
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
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" component="div" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              Climate
            </Typography>
          </Box>
          <Stack direction="row">
            <Stack direction="row">
              <Button color="inherit" onClick={() => navigate('/inventories/list')}>
                Inventories
              </Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
            </Stack>
            <Button color="inherit" onClick={handleClick}>
              Sign out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PrimaryAppBar;
