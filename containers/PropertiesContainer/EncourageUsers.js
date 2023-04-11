import { Typography, Box, Button } from '@mui/material';

const EncourageUsers = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#F5F5F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6" align="center">Why Use Our Property Management App?</Typography>
      <Typography variant="body1" align="center">
        Managing rental properties can be a hassle. But with our property management app, it's easy to keep track of everything from rent payments to maintenance requests. Here are some reasons why you should give our app a try:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" align="center">1. Simplify Your Rental Business</Typography>
        <Typography variant="body1" align="center">
          Our app provides an all-in-one solution for managing rental properties. Keep track of rent payments, maintenance requests, and more, all in one place.
        </Typography>
        <Typography variant="h6" align="center">2. Save Time and Effort</Typography>
        <Typography variant="body1" align="center">
          Say goodbye to manual data entry and paper-based processes. Our app streamlines property management tasks, saving you time and effort.
        </Typography>
        <Typography variant="h6" align="center">3. Get Better Insights</Typography>
        <Typography variant="body1" align="center">
          With our app, you can easily generate reports and analytics to gain insights into your rental business. Use these insights to make data-driven decisions that improve your bottom line.
        </Typography>
      </Box>
    </Box>
  );
};

export default EncourageUsers;
