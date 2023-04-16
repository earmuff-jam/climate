import React from "react";
import { useTheme } from "@mui/styles";
import LeaseInformationTable from "./LeaseInformationTable";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { REGULAR_AND_UP_SZ_SX, SMALL_SZ_SX } from "./constants";

const LeaseInformation = ({ tenants }) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box style={onlySmallScreen ? SMALL_SZ_SX : REGULAR_AND_UP_SZ_SX}>
      <Typography variant="h5">Lease Information</Typography>
      <LeaseInformationTable datasets={tenants} />
    </Box>
  );
};

export default LeaseInformation;
