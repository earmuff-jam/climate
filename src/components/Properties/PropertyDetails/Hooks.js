import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useQuery } from "react-query";

export const usePropertyDetailsConfig = (propertyId) => {
  const supabaseClient = useSupabaseClient();
  const [singleProperty, setSingleProperty] = useState({});
  const fetchAllPropertiesList = async (propertyId) => {
    const { data, error } = await supabaseClient
      .from("properties")
      .select(
        `
      id,
      title,
      description,
      property_type,
      address,
      bedrooms,
      bathrooms,
      square_footage,
      amenities,
      pet_policy,
      availability_dates_jsonb,
      rent_amount,
      security_deposit,
      lease_term,
      owner_id,
      contact_name,
      contact_phone,
      contact_email,
      location_point,
      nearby_locations,
      photos,
      floor_plan,
      created_by,
      created_on,
      updated_by,
      updated_on,
      sharable_groups
    `
      )
      .eq("id", propertyId);
    setSingleProperty(data);
  };

  useQuery("allPropertyList", fetchAllPropertiesList);
  return {
    singleProperty,
  };
};
