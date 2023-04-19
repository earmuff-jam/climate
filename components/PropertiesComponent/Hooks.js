import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ADD_PROPERTY_FORM_FIELDS, ADD_TENANT_FORM_FIELDS } from "./constants";
import { fetchWithCache, encodeQuery } from "../../utility/helper";
import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { uuid } from "uuidv4";

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
    const errorMsg = newFormData[name].validators.reduce((acc, el) => {
      el.validate(value) ? (acc = el.message) : null;
      return acc;
    }, "");
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
          address: inputValue,
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

export const useAddTenant = (setEditTenant) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [formValues, setFormValues] = useState(ADD_TENANT_FORM_FIELDS);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    const formattedData = { ...formValues };
    formattedData[name].value = newValue;
    const errorMsg = formattedData[name].validators.reduce((acc, el) => {
      el.validate(value) ? (acc = el.message) : null;
      return acc;
    }, "");
    formattedData[name].errorMsg = errorMsg;
    setFormValues({ ...formattedData });
  };

  const saveData = async (formValues) => {
    const tenant_identifier = uuid();
    const { data, error } = await supabaseClient.from("tenants").insert(
      {
        tenant_id: tenant_identifier,
        firstname: formValues.firstName.value,
        lastname: formValues.lastName.value,
        email: formValues.email.value,
        phone: formValues.phone.value,
        dob: formValues.dob.value,
        occupation: formValues.occupation.value,
        employer: formValues.employer.value,
        monthlyincome: formValues.monthlyIncome.value,
        emergencycontactname: formValues.emergencyContactName.value,
        emergencycontactphone: formValues.emergencyContactPhone.value,
        moveindate: formValues.moveInDate.value,
        leaseduration: formValues.leaseDuration.value,
        rentamount: formValues.rentAmount.value,
        securitydepositamount: formValues.securityDepositAmount.value,
        petallowed: formValues.petAllowed.value,
        petdescription: formValues.petDescription.value,
        backgroundcheckconsent: formValues.backgroundCheckConsent.value,
        created_at: new Date().toISOString(),
        created_by: user.id,
        sharable_groups: [user.id, tenant_identifier],
      },
      { upsert: true }
    );
    if (error) return;
    setFormValues(ADD_TENANT_FORM_FIELDS);
    setEditTenant(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues); // TODO: handle form submission
    if (
      Object.values(formValues)
        .map((v) => v.errorMsg)
        .filter(Boolean).length === 0
    ) {
      saveData(formValues);
    }
  };
  return {
    formValues,
    handleSubmit,
    handleChange,
  };
};
