import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useUser } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { BLANK_MAINTENANCE_PLAN } from './constants';
import { useUpsertMaintenancePlanDetails } from '@/features/maintenancePlan';

const AddPlan = ({ handleCloseAddNewPlan }) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const upsertMaintenancePlanDetailsMutation =
    useUpsertMaintenancePlanDetails();

  const [formData, setFormData] = useState({
    ...BLANK_MAINTENANCE_PLAN,
  });

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...formData };
    let errorMsg = '';

    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }

    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };

    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter(
      (v) => v.required
    );
    const isRequiredFieldsEmpty = requiredFormFields.some(
      (el) => el.value.trim() === ''
    );

    if (
      containsErr ||
      isRequiredFieldsEmpty ||
      storageLocation === null ||
      Object.keys(storageLocation).length <= 0
    ) {
      return;
    }

    const formattedData = Object.values(formData).reduce((acc, el) => {
      if (el.value) {
        acc[el.id] = el.value;
      }
      return acc;
    }, {});

    const draftRequest = {
      ...formattedData,
      location: storageLocation,
      created_by: user.id,
      created_on: dayjs().toISOString(),
    };

    upsertMaintenancePlanDetailsMutation.mutate(draftRequest, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['maintenancePlanDetails']);
        setFormData({ ...BLANK_MAINTENANCE_PLAN });
        handleCloseAddNewPlan();
      },
    });
  };

  const containsErr = Object.values(formData).reduce((acc, el) => {
    if (el.errorMsg) {
      return true;
    }
    return acc;
  }, false);

  const requiredFormFields = Object.values(formData).filter((v) => v.required);
  const isRequiredFieldsEmpty = requiredFormFields.some(
    (el) => el.value.trim() === ''
  );

  const isDisabled = containsErr || isRequiredFieldsEmpty;

  return (
    <Stack>
      <Stack paddingBottom={'2rem'}>
        <Typography> Fill in the necessary details</Typography>
        <Typography variant='caption'>
          Take steps to periodically check on your inventory items to ensure
          they are upto date.
        </Typography>
      </Stack>
      <Stack alignItems={'center'}>
        <Box component='form' sx={{ maxWidth: 600, width: '100%' }}>
          <Stack spacing={2} useFlexGap>
            <TextField
              id='plan'
              label='Plan Title'
              value={formData.plan.value}
              onChange={handleInputChange}
              fullWidth
              variant='outlined'
              size='small'
              error={Boolean(formData.plan['errorMsg'].length)}
              helperText={formData.plan['errorMsg']}
            />
            <TextField
              id='description'
              label='Plan description'
              placeholder='Description of plan in less than 500 words'
              value={formData.description.value}
              onChange={handleInputChange}
              fullWidth
              variant='outlined'
              size='small'
              multiline
              maxRows={4}
              rows={4}
              error={Boolean(formData.description['errorMsg'].length)}
              helperText={formData.description['errorMsg']}
            />
          </Stack>
          <Button
            onClick={handleSubmit}
            variant='outlined'
            sx={{ mt: 1 }}
            disabled={isDisabled}
          >
            Add new plan
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AddPlan;
