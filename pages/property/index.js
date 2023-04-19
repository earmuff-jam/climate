import React from "react";
import { maintenanceRequests } from "../../containers/HomeContainer/constants";
import MyRentalProperties from "../../containers/PropertiesContainer/MyRentalProperties";
import { usePropertyConfiguration } from "../../containers/PropertiesContainer/PropertyContainerHooks";

const Property = () => {
  const {
    properties,
    editMode,
    setEditMode,
    handleAddProperty,
    addTenant,
    handleAddTenant,
  } = usePropertyConfiguration();
  return (
    <MyRentalProperties
      editMode={editMode}
      setEditMode={setEditMode}
      handleAddProperty={handleAddProperty}
      properties={properties}
      maintenanceRequests={maintenanceRequests}
      addTenant={addTenant}
      handleAddTenant={handleAddTenant}
    />
  );
};

export default Property;
