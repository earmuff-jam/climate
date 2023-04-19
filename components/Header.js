import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import { Grid, Typography } from "@mui/material";

const Header = (props) => {
  const { data, isProperty } = props;
  const total = data.length;
  const constants = {
    property: {
      iconColor: "primary",
      pendingColor: "warning",
      hourglassColor: "action",
      vacantLabel: "Vacant Properties",
      pendingLabel: "Pending Properties",
      activeLabel: null,
      pendingCount: 2,
      vacantCount: 1,
      activeCount: null,
    },
    tenant: {
      iconColor: "secondary",
      pendingColor: "warning",
      hourglassColor: "action",
      vacantLabel: null,
      pendingLabel: "Pending Tenants",
      activeLabel: "Active Tenants",
      pendingCount: 2,
      vacantCount: null,
      activeCount: 2,
    },
  };
  const constantsForType = constants[isProperty ? "property" : "tenant"];

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <HomeRoundedIcon color={constantsForType.iconColor} />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          {isProperty ? "Total Properties" : "Total Tenants"}: {total}
        </Typography>
      </Grid>
      <Grid item>
        <HourglassEmptyRoundedIcon color={constantsForType.hourglassColor} />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          {isProperty
            ? constantsForType.vacantLabel
            : constantsForType.activeLabel}
          :{" "}
          {isProperty
            ? constantsForType.vacantCount
            : constantsForType.activeCount}
        </Typography>
      </Grid>
      <Grid item>
        <PendingActionsRoundedIcon color={constantsForType.pendingColor} />
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" color="text.secondary">
          {isProperty ? constantsForType.pendingLabel : "Pending Tenants"}:{" "}
          {constantsForType.pendingCount}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
