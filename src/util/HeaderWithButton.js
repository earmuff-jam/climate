import { Box, Button, Stack, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

const HeaderWithButton = (props) => {
  const {
    title,
    showSecondaryTitle,
    secondaryTitle,
    showRedirectLink,
    redirectTo,
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
      <Stack>
        <Typography variant='h4' component='h2'>
          {title}
        </Typography>
        {showSecondaryTitle ? (
          // if we do not want to show redirect link
          showRedirectLink ? (
            <Link href={redirectTo} component={NextLink}>
              <Typography variant='caption'>{secondaryTitle}</Typography>
            </Link>
          ) : (
            <Typography variant='caption'>{secondaryTitle}</Typography>
          )
        ) : null}
      </Stack>
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
