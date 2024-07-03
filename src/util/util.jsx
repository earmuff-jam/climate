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
      <Stack direction="row" justifyContent="flex-end">
        <Button onClick={handleClose}>Go back</Button>
        <Button onClick={() => confirmDelete(deleteID)}>Confirm</Button>
      </Stack>
    </SimpleModal>
  ) : null;
};

/**
 * generate title color fn is used to build out the title and associated color with it.
 * @param {Object} row - the currently selected row
 * @param {Boolean} isCategory - if the selection is pertaining to category
 * @param {Boolean} override - if the table does not need these values
 */
export const generateTitleColor = (row, isCategory, override) => {
  let title = null;
  let color = null;

  if (override) {
    title = '';
    color = '';
    return { title, color };
  }

  if (isCategory) {
    title = row?.category_item.length > 0 && `Assigned ${row?.category_item[0].category_name} Category`;
    color = row?.category_item.length > 0 && row?.category_item[0].associated_color;
  } else {
    title =
      row?.maintenance_item.length > 0 && `Assigned ${row?.maintenance_item[0].maintenance_plan_name} Maintenance Plan`;
    color = row?.maintenance_item.length > 0 && row?.maintenance_item[0].associated_color;
  }
  return { title, color };
};
