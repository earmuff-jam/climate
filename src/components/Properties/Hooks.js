import { supabaseClient } from "@/util/SupabaseClient";
import { useQuery } from "react-query";

export const usePropertyConfig = () => {
  const fetchPropertyList = async () => {
    const { data, error } = await supabaseClient.from("properties").select(`
    id,
    title,
    description,
    property_type,
    bedrooms,
    bathrooms,
    square_footage,
    amenities,
    pet_policy,
    availability_dates_jsonb,
    rent_amount,
    security_deposit,
    lease_term,
    contact_name,
    contact_phone,
    contact_email,
    location_point,
    nearby_locations,
    photos,
    floor_plan
    `);
    return data;
  };

  const { isLoading, isError, error, data } = useQuery(
    "repoData",
    fetchPropertyList
  );

  return {
    isLoading,
    isError,
    error,
    data,
  };
};
