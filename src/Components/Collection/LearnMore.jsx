import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { DEFAULT_INVENTORIES_LANDING_PAGE_TEXT } from '../InventoryDetails/constants';

const LearnMore = () => {
  return (
    <Grid container spacing={4}>
      {DEFAULT_INVENTORIES_LANDING_PAGE_TEXT.map((item) => (
        <Grid item key={item.name} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: '20vh' }} // 16:9 aspect ratio
              image={item.imageSrc}
              alt={item.imageAlt}
            />
            <CardContent>
              <Typography variant="h6" component="h3">
                <a href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {item.name}
                </a>
              </Typography>
              <Typography variant="caption">{item.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LearnMore;
