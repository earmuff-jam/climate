import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import SimpleModal from './SimpleModal';
import { useRef, useState } from 'react';
import { ArrowDropDownCircleRounded } from '@mui/icons-material';

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

export const AssignCategoryMaintenanceButton = ({ disabled, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const anchorRef = useRef(null);

  const handleToggle = () => setOpen(!open);
  const handleClick = () => {
    return options[selected].action();
  };

  const handleMenuItemClick = (event, index) => {
    setSelected(index);
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef} aria-label="Assign selection to inventory item(s)">
        <Button disabled={disabled} onClick={handleClick}>
          {options[selected].label}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'assign-selection' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="assign"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownCircleRounded />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="assign-selection" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      selected={index === selected}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
