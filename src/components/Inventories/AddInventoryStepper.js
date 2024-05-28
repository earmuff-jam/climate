import React, { useState } from 'react';
import {
  TextField,
  Box,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  createFilterOptions,
  Card,
  CardContent,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  BookmarkRounded,
  CheckRounded,
  RestartAltRounded,
  SwapHorizRounded,
} from '@mui/icons-material';
import { useInventoryConfiguration } from './Hooks';

const filter = createFilterOptions();
const steps = ['Add inventory', 'Add more details', 'Publish inventory'];

export const loadInstructionsBasedOnStepNumber = (stepNumber) => {
  switch (stepNumber) {
    case 1:
      return (
        <Stack paddingBottom={'2rem'}>
          <Typography> Fill in the necessary details.</Typography>
          <Typography variant='caption'>
            These details will help us quickly search for the items that you are
            looking for later on.
          </Typography>
        </Stack>
      );
    case 2:
      return (
        <Stack paddingBottom={'2rem'}>
          <Typography> Fill in the optional details.</Typography>
          <Typography variant='caption'>
            Extra details helps you understand your product limitations, expiry
            dates and much more.
          </Typography>
        </Stack>
      );
    case 3:
      return <Typography> Confirm your changes.</Typography>;
    default:
      return null;
  }
};

export const loadAddFormBasedOnStepNumber = (
  stepNumber,
  formData,
  formDataError,
  storageLocation,
  setStorageLocation,
  handleInputChange,
  handleCheckbox,
  handleSubmit,
  options
) => {
  switch (stepNumber) {
    case 1:
      return (
        <Stack alignItems={'center'}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, width: '100%' }}
          >
            <Stack spacing={2} useFlexGap>
              <Stack direction={'row'} spacing={2} useFlexGap>
                <TextField
                  id='name'
                  label='Item name'
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  variant='outlined'
                  size='small'
                  error={Boolean(formDataError.name['errorMsg'].length)}
                  helperText={formDataError.name['errorMsg']}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_bookmarked}
                      onChange={(e) =>
                        handleCheckbox('is_bookmarked', e.target.checked)
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Stack direction={'row'} alignItems={'center'}>
                      <BookmarkRounded
                        color={formData.is_bookmarked ? 'primary' : 'secondary'}
                      />
                      <Typography variant='caption'>Bookmark</Typography>
                    </Stack>
                  }
                />
              </Stack>
              <TextField
                id='description'
                label='Description'
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.description['errorMsg'].length)}
                helperText={formDataError.description['errorMsg']}
              />
            </Stack>
            <Stack direction={'row'} sx={{ py: 2 }} useFlexGap spacing={2}>
              <TextField
                id='quantity'
                label='Item quantity'
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.quantity['errorMsg'].length)}
                helperText={formDataError.quantity['errorMsg']}
              />
            </Stack>
            <Autocomplete
              fullWidth
              freeSolo
              forcePopupIcon
              value={storageLocation?.location || ''}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setStorageLocation({
                    location: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setStorageLocation({
                    location: newValue.inputValue,
                  });
                } else {
                  setStorageLocation(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.location
                );
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    location: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id='autocomplete-storage-location'
              options={options}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.location;
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.location}</li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label='Storage Location'
                  variant='standard'
                  placeholder='Where do you plan to store this item'
                />
              )}
            />
          </Box>
        </Stack>
      );
    case 2:
      return (
        <Stack alignItems={'center'}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, width: '100%' }}
          >
            <Stack spacing={2} useFlexGap>
              <TextField
                id='price'
                label='Item price'
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.price['errorMsg'].length)}
                helperText={formDataError.price['errorMsg']}
              />
              <Stack direction={'row'} useFlexGap spacing={2}>
                <TextField
                  id='barcode'
                  label='Item Barcode'
                  value={formData.barcode}
                  onChange={handleInputChange}
                  fullWidth
                  variant='outlined'
                  size='small'
                  error={Boolean(formDataError.barcode['errorMsg'].length)}
                  helperText={formDataError.barcode['errorMsg']}
                />
                <TextField
                  id='sku'
                  label='Item SKU'
                  value={formData.sku}
                  onChange={handleInputChange}
                  fullWidth
                  variant='outlined'
                  size='small'
                  error={Boolean(formDataError.sku['errorMsg'].length)}
                  helperText={formDataError.sku['errorMsg']}
                />
              </Stack>

              <Stack direction={'row'} useFlexGap spacing={2}>
                <TextField
                  id='bought_at'
                  label='Place of purchase'
                  value={formData.bought_at}
                  onChange={handleInputChange}
                  fullWidth
                  variant='outlined'
                  size='small'
                  error={Boolean(formDataError.bought_at['errorMsg'].length)}
                  helperText={formDataError.bought_at['errorMsg']}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_returnable}
                      onChange={(e) =>
                        handleCheckbox('is_returnable', e.target.checked)
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Stack direction={'row'} alignItems={'center'}>
                      <SwapHorizRounded
                        color={formData.is_returnable ? 'primary' : 'secondary'}
                      />
                      <Typography variant='caption'>Returnable</Typography>
                    </Stack>
                  }
                />
              </Stack>
              {formData.is_returnable ? (
                <Stack direction={'row'} useFlexGap spacing={2}>
                  <TextField
                    id='return_location'
                    label='Item return location'
                    value={formData.return_location}
                    onChange={handleInputChange}
                    fullWidth
                    variant='outlined'
                    size='small'
                    error={Boolean(
                      formDataError.return_location['errorMsg'].length
                    )}
                    helperText={formDataError.return_location['errorMsg']}
                  />
                  <TextField
                    fullWidth
                    id='return_datetime'
                    label='Return date and time'
                    variant='standard'
                    type='datetime-local'
                    value={formData.return_datetime}
                    onChange={handleInputChange}
                    error={Boolean(
                      formDataError.return_datetime['errorMsg'].length
                    )}
                    helperText={formDataError.return_datetime['errorMsg']}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
              ) : null}
            </Stack>

            <Stack direction={'row'} useFlexGap spacing={2} sx={{ py: 2 }}>
              <TextField
                id='max_weight'
                label='Max weight in kg'
                value={formData.max_weight}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.max_weight['errorMsg'].length)}
                helperText={formDataError.max_weight['errorMsg']}
              />
              <TextField
                id='min_weight'
                label='Min weight in kg'
                value={formData.min_weight}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.min_weight['errorMsg'].length)}
                helperText={formDataError.min_weight['errorMsg']}
              />
            </Stack>
            <Stack direction={'row'} useFlexGap spacing={2}>
              <TextField
                id='max_height'
                label='Max height in inches'
                value={formData.max_height}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.max_height['errorMsg'].length)}
                helperText={formDataError.max_height['errorMsg']}
              />
              <TextField
                id='min_height'
                label='Min height in inches'
                value={formData.min_height}
                onChange={handleInputChange}
                fullWidth
                variant='outlined'
                size='small'
                error={Boolean(formDataError.min_height['errorMsg'].length)}
                helperText={formDataError.min_height['errorMsg']}
              />
            </Stack>
          </Box>
        </Stack>
      );
    case 3:
      return (
        <Stack alignItems={'center'}>
          <Card sx={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
            <CardContent>
              <Stack direction='row'>
                <IconButton disabled>
                  <BookmarkRounded
                    color={formData.is_bookmarked ? 'primary' : 'secondary'}
                  />
                </IconButton>
                <Stack>
                  <Typography>Item name: {formData.name}</Typography>
                  <Typography variant='caption'>
                    {formData.description}
                  </Typography>
                  <Stack direction={'row'} spacing={1}>
                    <Typography fontWeight={'bold'}>Quantity: </Typography>
                    <Typography>{formData.quantity}</Typography>
                  </Stack>
                </Stack>
                <Box sx={{ flexGrow: 1 }}></Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      );
    default:
      return null;
  }
};

export default function AddInventoryStepper() {
  const {
    formData,
    formDataError,
    storageLocation,
    setStorageLocation,
    handleInputChange,
    handleCheckbox,
    handleSubmit,
    isFetchAllInventoryStorageLocationOptionsLoading,
    fetchAllInventoryStorageLocationOptionsData,
  } = useInventoryConfiguration();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  if (isFetchAllInventoryStorageLocationOptionsLoading)
    return (
      <Skeleton variant='rounded' animation='wave' height={100} width={100} />
    );

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant='caption'>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button startIcon={<RestartAltRounded />} onClick={handleReset}>
              Reset
            </Button>
            <Button startIcon={<CheckRounded />} onClick={handleReset}>
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Step {activeStep + 1}
            {loadInstructionsBasedOnStepNumber(activeStep + 1)}
            {loadAddFormBasedOnStepNumber(
              activeStep + 1,
              formData,
              formDataError,
              storageLocation,
              setStorageLocation,
              handleInputChange,
              handleCheckbox,
              handleSubmit,
              fetchAllInventoryStorageLocationOptionsData.data
            )}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep !== steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : null}
          </Box>
        </>
      )}
    </Box>
  );
}
