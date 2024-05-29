import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

const HeaderWithButton = (props) => {
  const {
    title,
    showPrimaryButton,
    primaryButtonVariant,
    primaryButtonColor,
    primaryButtonTextLabel,
    showPrimaryStartIcon,
    primaryStartIcon,
    showSecondaryButton,
    secondaryButtonVariant,
    secondaryButtonTextLabel,
    secondaryButtonColor,
    showSecondaryStartIcon,
    secondaryStartIcon,
    handleClickPrimaryButton,
    handleClickSecondaryButton,
  } = props;
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={4}
    >
      <Typography variant='h4' component='h2'>
        {title}
      </Typography>
      <Stack direction='row' spacing={2} useFlexGap>
        {showPrimaryButton ? (
          <Button
            color={primaryButtonColor}
            variant={primaryButtonVariant}
            onClick={handleClickPrimaryButton}
            startIcon={showPrimaryStartIcon ? primaryStartIcon : null}
          >
            {primaryButtonTextLabel}
          </Button>
        ) : null}
        {showSecondaryButton ? (
          <Button
            color={secondaryButtonColor}
            variant={secondaryButtonVariant}
            onClick={handleClickSecondaryButton}
            startIcon={showSecondaryStartIcon ? secondaryStartIcon : null}
          >
            {secondaryButtonTextLabel}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};

export default HeaderWithButton;
