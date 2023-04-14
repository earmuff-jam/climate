import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ADD_PROPERTY_FORM_FIELDS } from "./constants";

export const useAddProperty = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [formData, setFormData] = useState(ADD_PROPERTY_FORM_FIELDS);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData };
    newFormData[name].value = value;
    const errorMsg = newFormData[name].validators.reduce(
      (acc, el, index, arr) => {
        el.validate(value) ? (acc = el.message) : null;
        return acc;
      },
      ""
    );
    newFormData[name].errorMsg = errorMsg;
    setFormData({ ...newFormData });
  };

  const resetData = () => {
    setFormData({ ...ADD_PROPERTY_FORM_FIELDS });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // logic for all form fields submitted
    if (Object.keys(formData).length) {
      await supabaseClient.from("properties").insert(
        {
          id: formData.id,
          name: formData.name,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipCode,
          sqft: formData.sqft,
          numberofbedrooms: formData.bedrooms,
          numberofbathrooms: formData.bathrooms,
          yearbuilt: formData.yearbuilt,
          garage: formData.garage,
          image: formData.image,
          created_at: new Date().toISOString(),
          created_by: user.id,
          sharable_groups: [user.id],
        },
        { upsert: true }
      );
    }
    resetData();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetData,
  };
};
