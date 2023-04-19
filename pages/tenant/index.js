import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddTenant from "../../components/PropertiesComponent/AddTenant";
import { useTenantConfiguration } from "../../containers/TenantContainer/TenantContainerHooks";
import Title from "../../components/Title";
import Header from "../../components/Header";
import DisplayList from "../../components/DisplayList";

const HeaderDetails = ({ editTenant, handleAddTenant, tenants }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
      <Title editTenant={editTenant} handleAddTenant={handleAddTenant} />
      <Header data={tenants} />
    </Grid>
  );
};

const Body = ({ editTenant, setEditTenant, tenants }) => {
  const theme = useTheme();
  const mdSxLower = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid container>
      <Grid item xs={`${mdSxLower ? 12 : 6}`}>
        {tenants.length <= 0 && (
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Sorry no matching tenants found.
          </Typography>
        )}
        {tenants.length > 0 && <DisplayList items={tenants} type={"tenants"} />}
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
          {editTenant && <AddTenant setEditTenant={setEditTenant} />}
          {!editTenant && <>fill this with tenant related things.</>}
        </Box>
      </Grid>
    </Grid>
  );
};

const Tenant = () => {
  const { tenants, editTenant, setEditTenant, handleAddTenant } =
    useTenantConfiguration();

  return (
    <Box>
      <HeaderDetails
        editTenant={editTenant}
        handleAddTenant={handleAddTenant}
        tenants={tenants}
      />
      <Body
        editTenant={editTenant}
        setEditTenant={setEditTenant}
        tenants={tenants}
      />
    </Box>
  );
};

export default Tenant;
