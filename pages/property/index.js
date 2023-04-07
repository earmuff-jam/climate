import React, { useState, useEffect } from 'react'
import { AddRounded, CloseRounded } from '@mui/icons-material';
import AddProperty from '../../containers/PropertiesContainer/AddProperty';
import DisplayPropertyList from '../../containers/PropertiesContainer/DisplayPropertyList';
import { Box, Button, Grid, Typography } from '@mui/material';
import default_img_property from '../../public/default_img_property.jpeg';
import PropertyListReports from '../../containers/PropertiesContainer/PropertyListReports';
import MaintenanceRequests from '../../containers/PropertiesContainer/MaintenanceRequests';
import { maintenanceRequests } from './constants';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch properties from API or database
    const fetchedProperties = [
      { id: 1, name: '129 Issac Newton Crossing', city: 'Little Elm Dallas', state: 'TX', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '2', numberOfBathrooms: '2', yearBuilt: '1985', garage: '2', image: default_img_property },
      { id: 2, name: '456 Oak Ave.', city: 'Los Angeles', state: 'CA', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '3', numberOfBathrooms: '2', yearBuilt: '2016', garage: '3', image: default_img_property },
      { id: 3, name: '789 Elm St.', city: 'New York', state: 'NY', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '2', numberOfBathrooms: '2', yearBuilt: '1985', garage: '2', image: default_img_property },
      { id: 1, name: '123 Main St.', city: 'San Francisco', state: 'CA', zipcode: '12345', sqFt: '1109', numberOfBedRooms: '2', numberOfBathrooms: '3', yearBuilt: '2019', garage: '3', image: default_img_property },
    ];
    setProperties(fetchedProperties);
    setEditMode(false);
  }, []);

  const handleAddProperty = () => {
    setEditMode(!editMode);
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid item>
          <Typography variant="h5">My Properties</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={!editMode ? <AddRounded /> : <CloseRounded />} onClick={handleAddProperty}>
            {!editMode ? 'Add Property' : 'Close'}
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {editMode && <AddProperty />}
        {!editMode && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DisplayPropertyList properties={properties} />
            <MaintenanceRequests maintenanceRequests={maintenanceRequests} />
            <PropertyListReports width={'70rem'} height={'30rem'} properties={properties} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Property;