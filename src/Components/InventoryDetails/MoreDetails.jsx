import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { DeleteRounded, EditRounded, MoreVertRounded, MoveUpRounded } from '@mui/icons-material';

const MoreDetails = ({
  selectedID,
  handleEdit,
  rowSelected,
  handleAddCategory,
  handleAddInventory,
  handleDeleteInventory,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="more"
        id="more-details-btn"
        aria-controls={open ? 'more-details-btn' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        id="more-details-btn"
        MenuListProps={{
          'aria-labelledby': 'more-details-btn',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleEdit(selectedID);
            handleClose();
          }}
        >
          <IconButton size="small" color="primary">
            <EditRounded fontSize="small" />
          </IconButton>
          <Typography variant="caption">Edit item</Typography>
        </MenuItem>
        <MenuItem
          disabled={rowSelected.length <= 0}
          onClick={() => {
            handleAddCategory();
            handleClose();
          }}
        >
          <IconButton size="small" color="primary">
            <MoveUpRounded fontSize="small" />
          </IconButton>
          <Typography variant="caption">Assign / reassign category</Typography>
        </MenuItem>
        <MenuItem
          disabled={rowSelected.length <= 0}
          onClick={() => {
            handleAddInventory();
            handleClose();
          }}
        >
          <IconButton size="small" color="primary">
            <MoveUpRounded fontSize="small" />
          </IconButton>
          <Typography variant="caption">Assign / reassign maintenance plan</Typography>
        </MenuItem>
        <MenuItem
          disabled={rowSelected.length <= 0}
          onClick={() => {
            handleDeleteInventory();
            handleClose();
          }}
        >
          <IconButton size="small" color="primary">
            <DeleteRounded fontSize="small" color="error" />
          </IconButton>
          <Typography variant="caption">Delete selected inventory</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreDetails;
