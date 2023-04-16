import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import DisplayPropertyList from "../../components/DisplayList";
import MaintenanceRequests from "../../components/PropertiesComponent/MaintenanceRequests";
import PropertyListReports from "../../components/PropertiesComponent/PropertyListReports";
import AddProperty from "../../components/PropertiesComponent/AddProperty";
import Title from "../../components/Title";
import Header from "../../components/Header";
import DisplayList from "../../components/DisplayList";
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
  const mdSxLower = useMediaQuery(theme.breakpoints.down("lg"));
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const regularAndHigherScreenSx = {
    width: "44rem",
    height: "30vh",
    marginBottom: "2rem",
  };
  const smallScreenSx = { width: "44rem", height: "30vh" };

  return (
    <Grid container>
      <Grid item xs={`${mdSxLower ? 12 : 6}`}>
        {properties.length <= 0 && (
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Sorry no matching properties found.
          </Typography>
        )}
        {properties.length > 0 && (
          <DisplayList items={properties} type={"properties"} />
        )}
      </Grid>
      <Grid item xs={`${mdSxLower ? 12 : 6}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {editMode && <AddProperty setEditMode={setEditMode} />}
          {!editMode && (
            <>
              <MaintenanceRequests
                maintenanceRequests={maintenanceRequests}
                onlySmallScreen={onlySmallScreen}
                smallScreenSx={smallScreenSx}
                regularAndHigherScreenSx={regularAndHigherScreenSx}
              />
              <PropertyListReports
                properties={properties}
                onlySmallScreen={onlySmallScreen}
                smallScreenSx={smallScreenSx}
                regularAndHigherScreenSx={regularAndHigherScreenSx}
              />
            </>
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
