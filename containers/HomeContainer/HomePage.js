import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  return (
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Your Trusted Property Management Partner
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              We provide comprehensive property management services that help you maximize your investment and minimize your hassle.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Whether you're a homeowner looking to rent out your property or a tenant searching for the perfect place to call home, we've got you covered.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              With our experience and expertise, you can rest assured that your property is in good hands.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(/images/homepage-hero.jpg)', backgroundSize: 'cover', filter: 'brightness(0.7)' }} />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'common.black', mb: 2 }}>
                  Manage Your Property
                </Typography>
                <Typography variant="body1" sx={{ color: 'common.black', mb: 4 }}>
                  Overview of your properties and view details of each of said properties.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => (router.push("/property"))}>
                  View Properties
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
