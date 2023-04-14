import React from "react";
import { maintenanceRequests } from "../../containers/HomeContainer/constants";
import MyRentalProperties from "../../containers/PropertiesContainer/MyRentalProperties";
import { usePropertyConfiguration } from "../../containers/PropertiesContainer/PropertyContainerHooks";

const Property = () => {
  const { properties, editMode, setEditMode, handleAddProperty } =
    usePropertyConfiguration();
  return (
    <MyRentalProperties
      editMode={editMode}
      setEditMode={setEditMode}
      handleAddProperty={handleAddProperty}
      properties={properties}
      maintenanceRequests={maintenanceRequests}
    />
  );
};

export default Property;
