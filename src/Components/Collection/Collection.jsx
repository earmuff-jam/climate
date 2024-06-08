import { Typography, Container, Box } from '@mui/material';
import LearnMore from './LearnMore';

export default function Collection(props) {
  const { title } = props;
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <LearnMore />
      </Container>
    </Box>
  );
}
