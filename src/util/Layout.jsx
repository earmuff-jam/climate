import { Outlet } from 'react-router-dom';
import PrimaryAppBar from '../Containers/AppBar/PrimaryAppBar';
import { Box, CircularProgress, CssBaseline, Skeleton } from '@mui/material';
import { useUser } from '@supabase/auth-helpers-react';
import { validate } from 'uuid';
import { ThemeProvider } from '@emotion/react';
import { useFetchProfileConfig } from '../features/profile';
import { darkTheme, lightTheme } from './theme';
import { Suspense } from 'react';

const Layout = () => {
  const user = useUser();
  const { data = {}, isLoading } = useFetchProfileConfig();

  if (isLoading) return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  return (
    <ThemeProvider theme={data.display_mode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="inherit" />
          </Box>
        }
      >
        <Box height="100%" bgcolor="background.default">
          <PrimaryAppBar isUserLoggedIn={validate(user?.id)} />
          <Outlet />
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
