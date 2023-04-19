import React from "react";
import { Grid } from "@mui/material";
import PropertyCard from "./PropertiesComponent/PropertyCard";
import LeaseInformation from "./LeaseInformation/LeaseInformation";
import TenantInformation from "./TenantInformation/TenantInformation";

const DisplayList = ({ items, type }) => {
  return (
    <>
      <Grid container spacing={2}>
        {type === "properties" &&
          items.map((item, index) => (
            <Grid item xs={12} md={6} key={item.id}>
              <PropertyCard property={item} index={index} />
            </Grid>
          ))}
        {type === "tenants" && (
          <>
            <Grid item xs={12}>
              <TenantInformation tenants={items} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LeaseInformation tenants={items} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default DisplayList;
