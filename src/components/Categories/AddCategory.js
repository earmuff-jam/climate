import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  BLANK_CATEGORY_DETAILS,
  BLANK_CATEGORY_DETAILS_ERROR,
  BLANK_CATEGORY_DETAILS_TOUCHED,
} from './constants';

const AddCategory = () => {
  const [categoryDetails, setCategoryDetails] = useState({
    ...BLANK_CATEGORY_DETAILS,
  });
  const [categoryDetailsError, setCategoryDetailsError] = useState({
    ...BLANK_CATEGORY_DETAILS_ERROR,
  });

  const [categoryDetailsTouched, setCategoryDetailsTouched] = useState({
    ...BLANK_CATEGORY_DETAILS_TOUCHED,
  });

  const addCategoryDetails = () => {
    const addItemToInventory = async (formData) => {
      // const { resp, err } = await supabaseClient
      //   .from('inventories')
      //   .insert({
      //     name: categoryDetails.name,
      //     description: categoryDetails.description,
      //     price: categoryDetails.price,
      //     barcode: categoryDetails.barcode,
      //     sku: categoryDetails.sku,
      //     quantity: categoryDetails.quantity,
      //     bought_at: categoryDetails.bought_at,
      //     location: categoryDetails.location,
      //     is_bookmarked: categoryDetails.is_bookmarked,
      //     is_returnable: categoryDetails.is_returnable,
      //     return_location: categoryDetails.return_location,
      //     max_weight: categoryDetails.max_weight,
      //     min_weight: categoryDetails.min_weight,
      //     max_height: categoryDetails.max_height,
      //     min_height: categoryDetails.min_height,
      //     created_by: user.id,
      //     created_at: categoryDetails.created_at,
      //     updated_by: user.id,
      //     updated_at: categoryDetails.updated_at,
      //     sharable_groups: [user.id],
      //   })
      //   .select();
      // return;
    };
  };

  const handleInputChange = (ev) => {
    const { id, value } = event.target;

    const draftErrorElements = { ...categoryDetailsError };
    let errorFound = false;

    for (const validator of draftErrorElements[id].validators) {
      if (validator.validate(value)) {
        draftErrorElements[id] = {
          ...draftErrorElements[id],
          errorMsg: validator.message,
        };
        errorFound = true;
        break;
      }
    }

    if (!errorFound) {
      draftErrorElements[id] = {
        ...draftErrorElements[id],
        errorMsg: '',
      };
    }

    setCategoryDetailsError(draftErrorElements);
    setCategoryDetailsTouched({ ...categoryDetailsTouched, [id]: true });
    setCategoryDetails({ ...categoryDetails, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      Object.values(categoryDetailsError).some((v) => v.errorMsg.length >= 0)
    ) {
      return false;
    }

    const draftRequest = {
      ...formData,
      location: storageLocation.storageLocation,
      created_by: userID,
    };

    addCategoryDetails(draftRequest);
    setCategoryDetails({ ...BLANK_INVENTORY_FORM });
    setCategoryDetailsTouched({ ...BLANK_CATEGORY_DETAILS_TOUCHED });
  };

  return (
    <Stack>
      <Stack paddingBottom={'2rem'}>
        <Typography> Fill in the necessary details</Typography>
        <Typography variant='caption'>Add new category.</Typography>
      </Stack>
      <Stack alignItems={'center'}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ maxWidth: 600, width: '100%' }}
        >
          <Stack spacing={2} useFlexGap>
            <TextField
              id='category_name'
              label='Category name'
              value={categoryDetails.name}
              onChange={handleInputChange}
              fullWidth
              variant='outlined'
              size='small'
              error={Boolean(
                categoryDetailsError.category_name['errorMsg'].length
              )}
              helperText={categoryDetailsError.category_name['errorMsg']}
            />
            <TextField
              id='category_description'
              label='Category description'
              placeholder='Description of category in less than 500 words'
              value={categoryDetails.category_description}
              onChange={handleInputChange}
              fullWidth
              variant='outlined'
              size='small'
              multiline
              maxRows={4}
              rows={4}
              error={Boolean(
                categoryDetailsError.category_description['errorMsg'].length
              )}
              helperText={categoryDetailsError.category_description['errorMsg']}
            />
          </Stack>
          <Button
            onClick={handleSubmit}
            variant='outlined'
            sx={{ mt: 1 }}
            disabled={
              Object.values(categoryDetailsTouched).filter(Boolean).length !=
                2 ||
              Object.values(categoryDetailsError).some(
                (v) => v.errorMsg.length > 0
              )
            }
          >
            Create new category
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AddCategory;
