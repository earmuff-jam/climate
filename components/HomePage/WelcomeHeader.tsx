import React from "react";
import Link from "next/link";
import { Stack } from "@mui/system";
import { Box, IconButton, Typography } from "@mui/material";
import WarningRounded from "@mui/icons-material/WarningRounded";

const WelcomeHeader = () => {

  return (
    <Box>
      <Stack
        direction="row"
      >
        <Typography>
          Welcome User !
        </Typography>
      </Stack>
      <Stack
        direction='row'
        alignItems={'center'}
      >
        <IconButton
          size="small"
        >
          <WarningRounded />
        </IconButton>
        <Typography
          variant="body2"
        >
          You have some existing alerts. <Link href={'/'}> View alert ! </Link>
        </Typography>
      </Stack>
    </Box>
  )
};

export default WelcomeHeader;