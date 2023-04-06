import React, { useState, useEffect } from 'react'
import PropertyList from '../../containers/PropertiesContainer/PropertiesList';
import AddProperty from '../../containers/PropertiesContainer/AddProperty';
import DisplayPropertyList from '../../containers/PropertiesContainer/DisplayPropertyList';
import { Box } from '@mui/material';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch properties from API or database
    const fetchedProperties = [
      { id: 1, name: '123 Main St.', city: 'San Francisco', state: 'CA' },
      { id: 2, name: '456 Oak Ave.', city: 'Los Angeles', state: 'CA' },
      { id: 3, name: '789 Elm St.', city: 'New York', state: 'NY' },
    ];
    setProperties(fetchedProperties);
    setEditMode(false);
  }, []);

  const handleAddProperty = () => {
    // Navigate to add property page
    setEditMode(!editMode);
    console.log('Add property clicked');
  };

  return (
    <Box>
      <PropertyList properties={properties
      } handleAddProperty={handleAddProperty} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {editMode && <AddProperty />}
        {!editMode && <DisplayPropertyList properties={properties} />}
      </Box>
    </Box>
  )
}

export default Property;