import React from "react";
import { useTheme } from "@mui/styles";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import TenantInformationTable from "./TenantInformationTable";
import { REGULAR_AND_UP_SZ_SX, SMALL_SZ_SX } from "./constants";

const TenantInformation = ({ tenants }) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box style={onlySmallScreen ? SMALL_SZ_SX : REGULAR_AND_UP_SZ_SX}>
      <Typography variant="h5">Tenant Information</Typography>
      <TenantInformationTable datasets={tenants} />
    </Box>
  );
};

export default TenantInformation;
