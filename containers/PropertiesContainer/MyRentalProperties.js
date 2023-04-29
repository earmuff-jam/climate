import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import DisplayPropertyList from "../../components/PropertiesComponent/DisplayPropertyList";
import MaintenanceRequests from "../../components/PropertiesComponent/MaintenanceRequests";
import PropertyListReports from "../../components/PropertiesComponent/PropertyListReports";
import AddProperty from "../../components/PropertiesComponent/AddProperty";
import Title from "../../components/Title";
import Header from "../../components/Header";

const HeaderDetails = ({ editMode, handleAddProperty, properties }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
      <Title editMode={editMode} handleAddProperty={handleAddProperty} />
      <Header data={properties} isProperty={true} />
    </Grid>
  );
};

const Body = ({ editMode, setEditMode, properties, maintenanceRequests }) => {
  const theme = useTheme();
  const smallerThanLarge = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid container spacing={2}>
      <Grid item xs={`${smallerThanLarge ? 12 : 6}`}>
        {properties.length <= 0 && (
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Sorry no matching properties found.
          </Typography>
        )}
        {properties.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <DisplayPropertyList properties={properties} />
          </Box>
        )}
      </Grid>
      <Grid item xs={`${smallerThanLarge ? 12 : 6}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100rem",
          }}
        >
          {editMode && <AddProperty setEditMode={setEditMode} />}
          {!editMode && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flexGrow: 1,
              }}
            >
              <PropertyListReports properties={properties} />
              <MaintenanceRequests maintenanceRequests={maintenanceRequests} />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

const MyRentalProperties = (props) => {
  const {
    editMode,
    setEditMode,
    handleAddProperty,
    properties,
    maintenanceRequests,
  } = props;

  return (
    <Box>
      <HeaderDetails
        editMode={editMode}
        handleAddProperty={handleAddProperty}
        properties={properties}
      />
      <Body
        editMode={editMode}
        setEditMode={setEditMode}
        properties={properties}
        maintenanceRequests={maintenanceRequests}
      />
    </Box>
  );
};

export default MyRentalProperties;
