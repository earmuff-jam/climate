import { Button, Stack, Typography } from '@mui/material';
import SimpleModal from './SimpleModal';

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

/**
 * Confirmation Box Modal
 */
export const ConfirmationBoxModal = ({
  openDialog,
  title,
  handleClose,
  maxSize,
  textVariant,
  text,
  deleteID,
  confirmDelete,
}) => {
  return openDialog ? (
    <SimpleModal title={title} handleClose={handleClose} maxSize={maxSize}>
      <Typography variant={textVariant}>{text}</Typography>
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Button onClick={handleClose}>Go back</Button>
        <Button onClick={() => confirmDelete(deleteID)}>Confirm</Button>
      </Stack>
    </SimpleModal>
  ) : null;
};
