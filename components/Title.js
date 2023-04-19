import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { AddRounded, CloseRounded } from "@mui/icons-material";

const TENANT_HEADER_TEXT = "My Total Tenants";
const PROPERTY_HEADER_TEXT = "My Rental Properties";

const Title = (props) => {
  const { editMode, editTenant, handleAddProperty, handleAddTenant } = props;

  return (
    <Grid container>
      <Grid item sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="text.primary">
          {editTenant !== undefined ? TENANT_HEADER_TEXT : PROPERTY_HEADER_TEXT}
        </Typography>
      </Grid>
      <Grid item>
        {editMode !== undefined && (
          <Button
            startIcon={!editMode ? <AddRounded /> : <CloseRounded />}
            onClick={handleAddProperty}
          >
            {!editMode ? "Add Property" : "Close"}
          </Button>
        )}
        {editTenant !== undefined && (
          <Button
            startIcon={!editTenant ? <AddRounded /> : <CloseRounded />}
            onClick={handleAddTenant}
          >
            {!editTenant ? "Add Tenant" : "Close"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Title;
