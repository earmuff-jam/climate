import { Button, Grid, Typography } from "@mui/material";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import React from "react";

const PropertyTitle = (props) => {
  const { editMode, handleAddProperty } = props;
  return (
    <>
      <Grid item>
        <Typography variant="h6" color="text.primary">
          My Rental Properties
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={!editMode ? <AddRounded /> : <CloseRounded />}
          onClick={handleAddProperty}
        >
          {!editMode ? "Add Property" : "Close"}
        </Button>
      </Grid>
    </>
  );
};

export default PropertyTitle;
