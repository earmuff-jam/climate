import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ADD_PROPERTY_FORM_FIELDS } from "./constants";
import { fetchWithCache, encodeQuery } from "../../utility/helper";
import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";

export const useAddProperty = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [formData, setFormData] = useState(ADD_PROPERTY_FORM_FIELDS);
  const [addressOptions, setAddressOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const loadingAddressOptions = addressOptions.length === 0;

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
          address: formData.address.value,
          sqft: formData.sqft.value,
          numberofbedrooms: formData.bedrooms.value,
          numberofbathrooms: formData.bathrooms.value,
          yearbuilt: formData.yearbuilt.value,
          garage: formData.garage.value,
          image: "https://picsum.photos/200",
          created_at: new Date().toISOString(),
          created_by: user.id,
          sharable_groups: [user.id],
        },
        { upsert: true }
      ));
    resetData();
  };

  const fetchUserLocationDebounced = useCallback(
    debounce((text) => {
      const data = {
        url: "https://geocode.maps.co/search?",
        params: {
          q: text,
        },
      };
      const completeURI = encodeQuery(data) + "+US";
      fetchWithCache(completeURI).then((result) => {
        const formattedResponse = result.map((v) => ({
          label: v.display_name,
          value: v.display_name,
        }));
        setAddressOptions(formattedResponse);
      });
    }, 3000),
    []
  );

  useEffect(() => {
    fetchUserLocationDebounced(inputValue);
  }, [formData.address.value, fetchUserLocationDebounced, inputValue]);

  return {
    formData,
    value,
    setValue,
    inputValue,
    setInputValue,
    addressOptions,
    loadingAddressOptions,
    handleInputChange,
    handleSubmit,
    resetData,
  };
};
