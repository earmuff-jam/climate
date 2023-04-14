import { Box, Grid, Typography } from "@mui/material";
import DisplayPropertyList from "../../components/PropertiesComponent/DisplayPropertyList";
import MaintenanceRequests from "../../components/PropertiesComponent/MaintenanceRequests";
import PropertyListReports from "../../components/PropertiesComponent/PropertyListReports";
import AddProperty from "../../components/PropertiesComponent/AddProperty";
import PropertyHeader from "../../components/PropertiesComponent/PropertyHeader";
import PropertyTitle from "../../components/PropertiesComponent/PropertyTitle";

const Header = ({ editMode, handleAddProperty, properties }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
      <PropertyTitle
        editMode={editMode}
        handleAddProperty={handleAddProperty}
      />
      <PropertyHeader properties={properties} />
    </Grid>
  );
};

const Body = ({ editMode, properties, maintenanceRequests }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        {properties.length <= 0 && (
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Sorry no matching records found.
          </Typography>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <DisplayPropertyList properties={properties} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {editMode && <AddProperty />}
          {!editMode && (
            <>
              <MaintenanceRequests maintenanceRequests={maintenanceRequests} />
              <PropertyListReports
                width={"70rem"}
                height={"30rem"}
                properties={properties}
              />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

const MyRentalProperties = (props) => {
  const { editMode, handleAddProperty, properties, maintenanceRequests } =
    props;

  return (
    <Box>
      <Header
        editMode={editMode}
        handleAddProperty={handleAddProperty}
        properties={properties}
      />
      <Body
        editMode={editMode}
        properties={properties}
        maintenanceRequests={maintenanceRequests}
      />
    </Box>
  );
};

export default MyRentalProperties;
