import { Box, Grid } from "@mui/material";
import DisplayPropertyList from "./DisplayPropertyList";
import MaintenanceRequests from "./MaintenanceRequests";
import PropertyListReports from "./PropertyListReports";
import AddProperty from "./AddProperty";
import PropertyHeader from "../../components/PropertiesComponent/PropertyHeader";
import PropertyTitle from "../../components/PropertiesComponent/PropertyTItle";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {editMode && <AddProperty />}
      {!editMode && (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <DisplayPropertyList properties={properties} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <MaintenanceRequests maintenanceRequests={maintenanceRequests} />
            <PropertyListReports
              width={"70rem"}
              height={"30rem"}
              properties={properties}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const MyRentalProperties = ({
  editMode,
  handleAddProperty,
  properties,
  maintenanceRequests,
}) => {
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
