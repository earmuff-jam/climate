import React from "react";
import { Grid } from "@mui/material";
import PropertyCard from "./PropertyCard";

const DisplayPropertyList = ({ properties }) => {

  return (
    <Grid container spacing={2}>
      {properties.map((property, index) => (
        <Grid item key={property.id}>
          <PropertyCard property={property} index={index} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayPropertyList;
