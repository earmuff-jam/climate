import React from 'react'
import { maintenanceRequests } from '../../containers/HomeContainer/constants';
import MyRentalProperties from '../../containers/PropertiesContainer/MyRentalProperties';
import { usePropertyConfiguration } from '../../containers/PropertiesContainer/PropertyContainerHooks';

const Property = () => {
  const { properties, handleAddProperty, editMode } = usePropertyConfiguration();
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

