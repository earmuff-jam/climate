import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { Box, Typography, Stack, Card, Skeleton } from "@mui/material";
import theme from "@/styles/theme";

const EntryForm = (props) => {
  const { redirectUri, supabase } = props;
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={3}
      style={{ backgroundImage: `url(/bg.svg)` }}
    >
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Box>
          <Typography variant="h5" color="primary.dark">
            Welcome
          </Typography>
          <Stack>
            <Typography variant="caption">Glad to see you. 👋</Typography>
            <Typography variant="caption">
              Complete the activity below so we know who you are.
            </Typography>
          </Stack>
        </Box>

        <Auth
          supabaseClient={supabase}
          redirectTo={redirectUri}
          providers={[]}
          appearance={{
            theme: theme,
            style: {
              anchor: {
                fontFamily: "Nunito, sans-serif",
                fontSize: theme.spacing(1.4)
              },
              input: {
                padding: "0.5rem",
                borderRadius: "0.2rem",
                fontFamily: "Nunito, sans-serif",
                fontSize: theme.spacing(1.4),
              },
              label: { fontFamily: "Nunito, sans-serif" },
              loader: <Skeleton width={"100%"} height={"100%"} />,
              message: {
                color: theme.palette.error.main,
                fontFamily: "Nunito, sans-serif",
              },
              button: {
                padding: "0.5rem",
                borderRadius: "0.3rem",
                fontFamily: "Nunito, sans-serif",

              },
            },
            variables: {
              default: {
                colors: {
                  brand: theme.palette.primary.main,
                  brandAccent: theme.palette.secondary.main,
                },
              },
            },
          }}
        />
      </Card>
    </Stack>
  );
};

export default EntryForm;
