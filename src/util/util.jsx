import { Stack, Typography } from '@mui/material';

/**
 * display no matching records found component if there are no records
 */
export const DisplayNoMatchingRecordsComponent = ({ subtitle = '' }) => (
  <Stack alignItems="center">
    <Typography color="textSecondary">Sorry, no matching records found.</Typography>
    <Typography variant="caption" color="textSecondary">
      {subtitle}
    </Typography>
  </Stack>
);
