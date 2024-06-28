import { Card, Skeleton, Stack } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { supabaseClient } from '../../util/SupabaseClient';
import { lightTheme } from '../../util/theme';

const Login = () => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={3} style={{ backgroundImage: `url(/bg.svg)` }}>
      <Card sx={{ width: '100%', boxShadow: 0 }}>
        <Auth
          supabaseClient={supabaseClient}
          providers={[]}
          appearance={{
            theme: lightTheme,
            style: {
              anchor: {
                fontFamily: 'Nunito, sans-serif',
                fontSize: lightTheme.spacing(1.4),
              },
              input: {
                padding: '0.5rem',
                border: 'none',
                borderBottom: '1px solid',
                borderRadius: '0.2rem',
                fontFamily: 'Nunito, sans-serif',
                fontSize: lightTheme.spacing(1.8),
              },
              label: { fontFamily: 'Nunito, sans-serif' },
              loader: <Skeleton width="100%" height="100%" />,
              message: {
                color: lightTheme.palette.error.main,
                fontFamily: 'Nunito, sans-serif',
              },
              button: {
                padding: '0.5rem',
                borderRadius: '0.3rem',
                fontFamily: 'Nunito, sans-serif',
              },
            },
            variables: {
              default: {
                colors: {
                  brand: lightTheme.palette.primary.main,
                  brandAccent: lightTheme.palette.secondary.main,
                },
              },
            },
          }}
        />
      </Card>
    </Stack>
  );
};

export default Login;
