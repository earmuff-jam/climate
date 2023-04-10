import React, { useState, useEffect } from 'react'
import default_img_property from '../../public/default_img_property.jpeg';
import { maintenanceRequests } from '../../containers/HomeContainer/constants';
import MyRentalProperties from '../../containers/PropertiesContainer/MyRentalProperties';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Property = () => {

  const supabaseClient = useSupabaseClient();
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const retrieveUserProperties = async () => {
    const { data, error } = await supabaseClient
      .from('properties')
      .select('*')
    if (error) return;
    setProperties(data);
  };

  useEffect(() => {
    // Fetch properties from API or database
    retrieveUserProperties();
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

