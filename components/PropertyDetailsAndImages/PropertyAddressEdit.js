import React, { useEffect, useMemo } from "react";

import { Box, IconButton, TextField } from "@mui/material";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";


const PropertyAddressEdit = ({ postalAddress }) => {
  const { postal, LABELS, FULL_WIDTH, setPostalField } =
    usePostalAddress(postalAddress);
  return (
    <>
      <div>PropertyAddressEdit</div>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>

      <AddingField
        key={"name"}
        field={"name"}
        label={LABELS["name"]}
        value={postal["name"]}
        fullWidth={FULL_WIDTH["name"]}
        setPostalField={(val) => setPostalField("name", val)}
      />
      <AddingField
        key={"street"}
        field={"street"}
        label={LABELS["street"]}
        value={postal["street"]}
        fullWidth={FULL_WIDTH["street"]}
        setPostalField={(val) => setPostalField("street", val)}
      />
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          gap: "1rem",
        }}
      >
        {['city', 'state'].map((field) => (
          <AddingField
            key={field}
            field={field}
            label={LABELS[field]}
            value={postal[field]}
            fullWidth={FULL_WIDTH[field]}
            setPostalField={(val) => setPostalField(field, val)}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          gap: "1rem",
        }}
      >
        {['zip', 'country'].map((field) => (
          <AddingField
            key={field}
            field={field}
            label={LABELS[field]}
            value={postal[field]}
            fullWidth={FULL_WIDTH[field]}
            setPostalField={(val) => setPostalField(field, val)}
          />
        ))}
      </Box>
      </Box>

    </>
  );
};
const AddingField = ({ field, value, label, setPostalField, fullWidth }) => {
  return (
    <TextField
      value={value}
      label={label}
      onChange={(e) => setPostalField(e.target.value)}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() => {
              // saveToDatabase(
              //   editProperty.postalAddressID,
              //   editProperty.apiField,
              //   editProperty.value
              // );
            }}
          >
            <PublishRoundedIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export const usePostalAddress = (postalAddress) => {
  const API_FIELDS = useMemo(
    () => ({
      id: "id",
      name: "name",
      street: "address_street_address",
      city: "address_locality",
      state: "address_region",
      country: "address_country",
      poBoxNumber: "post_office_box_number",
      zip: "postal_code",
    }),
    []
  );
  const LABELS = useMemo(
    () => ({
      name: "Name",
      street: "Street",
      city: "City",
      state: "State",
      country: "Country",
      poBoxNumber: "PO Box Number",
      zip: "Zip",
    }),
    []
  );
  const FULL_WIDTH = useMemo(
    () => ({
      name: true,
      street: true,
      city: true,
      state: false,
      country: true,
      poBoxNumber: false,
      zip: false,
    }),
    []
  );
  const [postal, setPostal] = React.useState({});
  const setField = (field, value) => {
    setPostal((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    if (!postalAddress) return;
    const jsVal = Object.keys(postalAddress).reduce((acc, key) => {
      const val = postalAddress[key];
      const newKey = Object.keys(API_FIELDS).find((k) => API_FIELDS[k] === key);
      if (newKey) {
        acc[newKey] = val;
      }
      return acc;
    }, {});
    setPostal(Object.assign({}, jsVal));
  }, [postalAddress, API_FIELDS]);

  return { postal, setPostalField: setField, API_FIELDS, LABELS, FULL_WIDTH };
};



export default PropertyAddressEdit;
