import { Stack } from '@mui/material';
import React from 'react';
import HeaderWithButton from '../../util/HeaderWithButton';

const LowItems = () => {
  return (
    <Stack>
      <HeaderWithButton
        title="Low on stock"
        titleVariant="h6"
        showSecondaryTitle="true"
        secondaryTitle={'View list of all the items that fall below the threshold set in categories'}
      />
    </Stack>
  );
};

export default LowItems;
