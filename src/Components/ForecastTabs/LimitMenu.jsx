import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import { CheckRounded } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { useUpsertCategoryThresholdsLimit } from '../../features/categories';

const LimitMenu = ({ category }) => {
  const upsertCategoryThresholdsLimitMutation = useUpsertCategoryThresholdsLimit();

  const [inputVal, setInputVal] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([
    {
      id: 1,
      label: 'One',
      value: 1,
      isSelected: false,
    },
    {
      id: 2,
      label: 'Two',
      value: 2,
      isSelected: false,
    },
    {
      id: 3,
      label: 'Ten',
      value: 10,
      isSelected: false,
    },
    {
      id: 4,
      label: 'Twenty-five',
      value: 25,
      isSelected: false,
    },
    {
      id: 5,
      label: 'Custom',
      value: '',
      isSelected: false,
    },
  ]);

  const open = Boolean(anchorEl);
  const handleOpen = (ev) => setAnchorEl(ev.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleInput = (ev) => {
    const resetOptions = options.map((option) => ({ ...option, isSelected: false }));
    setOptions(resetOptions);
    setInputVal(ev.target.value);
  };

  const debouncedSave = useCallback(
    debounce((value, categoryID) => {
      if (categoryID !== -1 || inputVal != '') {
        upsertCategoryThresholdsLimitMutation.mutate({
          thresholdLimit: value,
          categoryID: categoryID,
        });
      }
    }, 300),
    []
  );

  const handleClick = (ev, value, categoryID) => {
    setInputVal('');
    const updatedOptions = options.map((option) => ({
      ...option,
      isSelected: option.value === value,
    }));
    setOptions(updatedOptions);
    upsertCategoryThresholdsLimitMutation.mutate({ thresholdLimit: value, categoryID: categoryID });
  };

  useEffect(() => {
    if (inputVal === '') {
      return;
    }
    if (inputVal && category.id !== null && category.thresholdlimit !== inputVal) {
      debouncedSave(inputVal, category.id);
    }
  }, [inputVal]);

  useEffect(() => {
    const draftOptions = options.map((option) => ({
      ...option,
      isSelected: option.value === category.thresholdlimit,
    }));
    const isMenuSelected = draftOptions.map((option) => option.isSelected).filter(Boolean).length != 0;
    if (!isMenuSelected) {
      setInputVal(category.thresholdlimit);
    } else {
      setOptions(draftOptions);
    }
  }, [category]);

  return (
    <>
      <Button onClick={(ev) => handleOpen(ev)} sx={{ textTransform: 'none' }}>
        Select limit
      </Button>
      <Menu id="category-freq-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList dense>
          {options.map((option, index) => (
            <Box key={option.id}>
              {index !== 4 ? (
                <MenuItem onClick={(ev) => handleClick(ev, option.value, category.id)}>
                  <ListItemText>{option.label}</ListItemText>
                  {option.isSelected && (
                    <ListItemIcon>
                      <CheckRounded fontSize="small" />
                    </ListItemIcon>
                  )}
                </MenuItem>
              ) : (
                <Stack direction="row" alignItems="center" spacing="1rem" sx={{ px: 2 }}>
                  <Typography variant="body2">Custom:</Typography>
                  <TextField
                    variant="standard"
                    value={inputVal}
                    onChange={handleInput}
                    inputProps={{ 'aria-label': 'Custom threshold quantity' }}
                  />
                </Stack>
              )}
            </Box>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default LimitMenu;
