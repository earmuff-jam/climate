import { useProfileConfig } from '@/components/Auth/Hooks';
import PrivateLayout from '@/components/Auth/PrivateLayout';
import {
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Box,
  Skeleton,
} from '@mui/material';

export default function Profile() {
  const { isLoading, isError, error, profileData, submit, handleChange } =
    useProfileConfig();

  if (isLoading) {
    return (
      <Skeleton
        variant='rounded'
        animation='wave'
        height={'100%'}
        width={'100%'}
      />
    );
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth='md' sx={{ mt: 10 }}>
      <Box sx={{ px: 4 }}>
        <Typography variant='h6' gutterBottom>
          Profile Information
        </Typography>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Personal details of logged in user.
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>First name</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id='first_name'
              name='first_name'
              placeholder='First name'
              value={profileData?.first_name}
              onChange={handleChange}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>Last name</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id='last_name'
              name='last_name'
              placeholder='Last name'
              value={profileData?.last_name}
              onChange={handleChange}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>User name</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id='username'
              name='username'
              placeholder='User Name'
              value={profileData?.username || ''}
              onChange={handleChange}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>
              {profileData?.updated_on === null ? 'Created' : 'Last Updated'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant='body2'>
              {profileData?.updated_on === null
                ? profileData?.created_on
                : profileData?.updated_on}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant='contained' color='primary' onClick={submit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Profile.getInitialProps = async (ctx) => {
  return {};
};

Profile.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
