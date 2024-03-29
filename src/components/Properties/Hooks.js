import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";

export const BLANK_PROPERTIES_FORM = {
  id: "",
  title: "",
  description: "",
  property_type: "",
  address: "",
  bedrooms: "",
  bathrooms: "",
  square_footage: "",
  amenities: "",
  pet_policy: "",
  availability_dates_jsonb: "",
  rent_amount: "",
  security_deposit: "",
  lease_term: "",
  owner_id: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  location_point: "",
  nearby_locations: "",
  photos: "",
  floor_plan: "",
  created_by: "",
  created_on: "",
  updated_by: "",
  updated_on: "",
  sharable_groups: "",
};

/**
 * this hook is used to tabulate data and field values in the property form.
 *
 */
export const usePropertyConfig = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const userID = user?.id;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...BLANK_PROPERTIES_FORM });

  const navigate = (pId) => {
    router.push({
      pathname: "/properties/[pId]",
      query: { pId },
    });
  };

  const processtoDb = async (formData) => {
    const { resp, err } = await supabaseClient
      .from("properties")
      .insert({
        title: formData.title,
        description: formData.description,
        property_type: formData.property_type,
        address: formData.address,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        square_footage: formData.square_footage,
        pet_policy: formData.pet_policy,
        rent_amount: formData.rent_amount,
        security_deposit: formData.security_deposit,
        lease_term: formData.lease_term,
        owner_id: user.id,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        created_by: user.id,
        sharable_groups: [user.id],
      })
      .select();
    return;
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    processtoDb(formData);
    setFormData({ ...BLANK_PROPERTIES_FORM });
  };

  const fetchPropertyList = async () => {
    if (userID) {
      const { data, error } =
        userID &&
        (await supabaseClient
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
          .eq("owner_id", userID));
      return data;
    }
    return null;
  };

  const fetchAllPropertiesList = async () => {
    const { data, error } = await supabaseClient.from("properties").select(
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
    );
    return data;
  };
  const { isLoading, isError, error, data } = useQuery(
    "repoData",
    fetchPropertyList
  );
  const { data: allPropertiesList } = useQuery(
    "allPropertyList",
    fetchAllPropertiesList
  );

  return {
    isLoading,
    isError,
    error,
    data,
    allPropertiesList,
    formData,
    open,
    handleClick,
    handleInputChange,
    handleSubmit,
    navigate,
  };
};
