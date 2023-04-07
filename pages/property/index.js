import React, { useState, useEffect } from 'react'
import default_img_property from '../../public/default_img_property.jpeg';
import { maintenanceRequests } from './constants';
import MyRentalProperties from '../../containers/PropertiesContainer/MyRentalProperties';

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
    <MyRentalProperties
      editMode={editMode}
      handleAddProperty={handleAddProperty}
      properties={properties}
      maintenanceRequests={maintenanceRequests}
    />
  )
}

export default Property;