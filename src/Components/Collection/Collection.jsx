import { Box, Container, Typography } from '@mui/material';
import LearnMore from './LearnMore';

const Collection = ({ title }) => {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <LearnMore />
      </Container>
    </Box>
  );
};

export default Collection;
