import React from 'react';
import InfoSection from './InfoSection';
import bgImage from '../../assets/bg.svg';
import { Button, Card, Stack, Typography } from '@mui/material';

export default function PromoSection() {
  return (
    <Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        height="100vh"
        spacing={3}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" color="primary.dark">
              Small business solutions
            </Typography>
            <Typography variant="h2" color="primary.main" fontWeight="bold">
              Manage inventories with a single click.
            </Typography>
            <Stack useFlexGap spacing={3} direction="row" alignSelf={'flex-end'}>
              <Button variant="contained"> Learn more </Button>
              <Button variant="contained">Sign up</Button>
            </Stack>
          </Stack>
        </Card>

        <InfoSection />
      </Stack>
    </Stack>
  );
}
