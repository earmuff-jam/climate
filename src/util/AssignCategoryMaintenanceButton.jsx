import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { useRef, useState } from 'react';
import { ArrowDropDownCircleRounded } from '@mui/icons-material';

/**
 * Utility function to combine button groups
 * @param {Array<Object>} options - array of options for the selection to choose from
 */
const AssignCategoryMaintenanceButton = ({ options }) => {
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
        <Button disabled={options[selected].disabled} onClick={handleClick}>
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

export default AssignCategoryMaintenanceButton;
