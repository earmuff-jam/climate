import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import DisplayPropertyList from "./DisplayPropertyList";
import MaintenanceRequests from "./MaintenanceRequests";
import PropertyListReports from "./PropertyListReports";
import AddProperty from "./AddProperty";

const Header = ({ editMode, handleAddProperty }) => {
    return (
        <Grid container alignItems="center" justifyContent="space-between" mb={2}>
            <Grid item>
                <Typography variant="h5">My Rental Properties</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" startIcon={!editMode ? <AddRounded /> : <CloseRounded />} onClick={handleAddProperty}>
                    {!editMode ? 'Add Property' : 'Close'}
                </Button>
            </Grid>
        </Grid>
    );
};

const Body = ({ editMode, properties, maintenanceRequests }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {editMode && <AddProperty />}
            {!editMode && (
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <DisplayPropertyList properties={properties} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <MaintenanceRequests maintenanceRequests={maintenanceRequests} />
                        <PropertyListReports width={'70rem'} height={'30rem'} properties={properties} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const MyRentalProperties = ({ editMode, handleAddProperty, properties, maintenanceRequests }) => {
    return (
        <Box>
            <Header editMode={editMode} handleAddProperty={handleAddProperty} />
            <Body editMode={editMode} properties={properties} maintenanceRequests={maintenanceRequests} />
        </Box>
    );
};

export default MyRentalProperties;