import { BoltRounded, CabinRounded, HighlightRounded } from '@mui/icons-material';
import { Box, Container, Grid, Typography, Button, Icon } from '@mui/material';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  return (
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                Your Trusted Property Management Partner
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 4 }}>
              At PropertyCo, we know that owning and managing properties can be a daunting task. That's why we're here to be your trusted partner in the journey. Our comprehensive property management services help you maximize your investment and minimize your hassle. Whether you're a homeowner looking to rent out your property or a tenant searching for the perfect place to call home, we've got you covered.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Icon sx={{ mr: 2 }}>
                <BoltRounded />
              </Icon>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Unleash Your Property Management Superpowers
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Are you ready to take charge of your properties like a pro? Our platform empowers you to do just that. With a bird's-eye view of all your properties, you can easily manage and optimize their performance. And if you need to dive deeper, we provide you with detailed information about each property, so you can make informed decisions that boost your ROI.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Our intuitive interface makes it easy to stay on top of everything. From rent collection to maintenance requests, from lease renewals to tenant screenings, we've got you covered. You can even generate custom reports and analyze your portfolio's performance over time. Plus, our 24/7 support team is always here to help you with any questions or concerns.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Icon sx={{ mr: 2 }}>
                <HighlightRounded />
              </Icon>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Don't let property management stress you out. Let us be your trusted partner and help you unleash your superpowers. Start your endavour today.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(/default_img_property.jpeg)', backgroundSize: 'cover', filter: 'opacity(0.2)' }} />
              <Box sx={{ position: 'relative', zIndex: 1, p: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                  Manage Your Properties
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                  Get an overview of your properties and access detailed information about each of them.
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
