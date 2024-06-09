import { Outlet } from 'react-router-dom';
import PrimaryAppBar from '../Containers/AppBar/PrimaryAppBar';
import { Box, Skeleton } from '@mui/material';
import { useUser } from '@supabase/auth-helpers-react';
import { validate } from 'uuid';
import { ThemeProvider } from '@emotion/react';
import { useFetchProfileConfigDetails } from '../features/profile';
import { darkTheme, lightTheme } from './theme';

const Layout = () => {
  const user = useUser();
  const { data, isLoading } = useFetchProfileConfigDetails();

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  }

  return (
    <ThemeProvider theme={data.display_mode ? darkTheme : lightTheme}>
      <Box height={'100vh'} bgcolor={'background.default'}>
        <PrimaryAppBar isUserLoggedIn={validate(user?.id)} />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
