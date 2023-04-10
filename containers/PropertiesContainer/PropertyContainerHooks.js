import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState, useEffect } from "react";

export const usePropertyConfiguration = () => {
  const supabaseClient = useSupabaseClient();
  const [editMode, setEditMode] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertyFinancialHistory, setPropertyFinancialHistory] = useState([]);

  const retrieveUserProperties = async () => {
    const { data, error } = await supabaseClient.from("properties").select(`
    id,
    name,
    city,
    state,
    zipcode,
    sqft,
    numberofbedrooms,
    numberofbathrooms,
    yearbuilt,
    garage,
    image,
    created_at,
    created_by,
    updated_by,
    updated_at,
    sharable_groups,
    property_financial_history(
        id,
        property_id,
        financial_type,
        amount, 
        date, 
        description,
        created_at,
        created_by,
        updated_by,
        updated_at,
        sharable_groups
    )`);
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

  return {
    properties,
    editMode,
    handleAddProperty,
  };
};
