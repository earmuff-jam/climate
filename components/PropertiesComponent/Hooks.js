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
    Object.values(formData)
      .map((v) => v.errorMsg)
      .filter(Boolean).length === 0 &&
      (await supabaseClient.from("properties").insert(
        {
          name: formData.name.value,
          state: formData.state.value,
          city: formData.city.value,
          zipcode: formData.zipCode.value,
          sqft: formData.sqft.value,
          numberofbedrooms: formData.bedrooms.value,
          numberofbathrooms: formData.bathrooms.value,
          yearbuilt: formData.yearbuilt.value,
          garage: formData.garage.value,
          // image: formData.image.value,
          created_at: new Date().toISOString(),
          created_by: user.id,
          sharable_groups: [user.id],
        },
        { upsert: true }
      ));
    resetData();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    resetData,
  };
};
