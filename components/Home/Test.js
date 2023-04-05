import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const useStyles = {
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
};

function BlogPost({ title, content }) {
  const classes = useStyles;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogPost;
