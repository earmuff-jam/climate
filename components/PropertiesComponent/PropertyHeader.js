import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import { Grid, Typography } from "@mui/material";

const PropertyHeader = (props) => {
  const { properties } = props;
  const totalProperties = properties.length;
  const pendingProperties = 2; // todo
  const vacantProperties = 1;
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <HomeRoundedIcon color="primary" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          Total Properties: {totalProperties}
        </Typography>
      </Grid>
      <Grid item>
        <HourglassEmptyRoundedIcon color="action" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          Vacant Properties: {vacantProperties}
        </Typography>
      </Grid>
      <Grid item>
        <PendingActionsRoundedIcon color="warning" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          Pending Properties: {pendingProperties}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PropertyHeader;
