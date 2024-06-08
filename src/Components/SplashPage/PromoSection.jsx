import InfoSection from './InfoSection';
import bgImage from '../../assets/bg.svg';
import { Button, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SimpleModal from '../../util/SimpleModal';
import Login from '../../Containers/SplashPage/Login';

export default function PromoSection() {
  const [openModal, setOpenModal] = useState(false);
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
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Card>
        <InfoSection />
      </Stack>
      {/* log in modal */}
      {openModal && (
        <SimpleModal
          title={`Welcome. Glad to see you. 👋`}
          subtitle={'Complete the activity below so we know who you are.'}
          handleClose={() => setOpenModal(false)}
          showSubmit={false}
          maxSize={'sm'}
        >
          <Login />
        </SimpleModal>
      )}
    </Stack>
  );
}
