import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import {
  SupabaseClient,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import PropertyAddressView from "./PropertyAddressView";
import { usePostalAddress } from "./PropertyAddressEdit";
import PropertyDetails from "./PropertyDetails";
import { EditRounded, PublishRounded } from "@mui/icons-material";
const PropertyDetailsAndImages = ({ property }) => {
  const supabaseClient = useSupabaseClient();
  const { postal, API_FIELDS } = usePostalAddress(property?.["postal_address"]);

  const [expanded, setExpanded] = React.useState([
    `panel${Math.floor(Math.random() * 4)}`,
  ]);

  const userWantsToEdit = true;

  const handleChange = (panel) => (event, isExpanded) => {
    // make a set of expanded panels
    const newExpanded = isExpanded
      ? [...expanded, panel]
      : expanded.filter((p) => p !== panel);
    setExpanded(newExpanded);
  };

  const saveToDatabase = async (postalAddressID, dataKey, value) => {
    const apiField = API_FIELDS[dataKey];
    const { data, error } = await supabaseClient
      .from("postal_address")
      .update({ [apiField]: value })
      .eq("id", postalAddressID)
      .select();
  };

  const [editProperty, setEditProperty] = React.useState({});

  // this function filters out properties that can be edited
  const startEditProperty = useCallback((property) => {
    const editableField = [
      // "id",
      "name",
      // "sqft",
      // "numberofbedrooms",
      // "numberofbathrooms",
      // "yearbuilt",
      // "garage",
      // "image",
      // "created_at",
      // "created_by",
      // "updated_by",
      // "updated_at",
      // "sharable_groups",
      // "postal_address_id",
      // "postal_address"
    ];
    // filter property to edit based on editableField
    let filteredProperty = Object.entries(property).filter(([key, value]) => 
       editableField.includes(key)
    );
    filteredProperty = Object.fromEntries(filteredProperty);
    setEditProperty({ ...filteredProperty, ...postal });
  }, [postal]);


  const closeEditProperty = useCallback(() => {
    setEditProperty({});
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Accordion
        expanded={expanded.includes("panel1")}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownRoundedIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {userWantsToEdit && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                startEditProperty(property);
              }}
            >
              <EditRounded />
            </IconButton>
          )}
          <PropertyAddressView
            name={postal.name}
            street={postal.street}
            city={postal.city}
            state={postal.state}
            country={postal.country}
            poBoxNumber={postal.poBoxNumber}
            zip={postal.zip}
          />
        </AccordionSummary>
        <AccordionDetails>
          <PropertyDetails property={property} />
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={Object.keys(editProperty).length}
        onClose={closeEditProperty}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          height: "calc(100vh - 20%)",
        }}>

        {Object.entries(editProperty).map(([key, value]) => {
          return (
            <TextField
              key={key}
              value={value}
              label={key}
              onChange={(e) => {
                setEditProperty({
                  ...editProperty,
                  [key]: e.target.value,
                });
              }}
              sx={{
                width: "20rem",
              }}
              InputProps={
                {
                 endAdornment: <IconButton onClick={() => {
                    saveToDatabase(property['postal_address_id'], key, editProperty[key])
                  }
                  }>
                    <PublishRounded />
                  </IconButton>
                }
              }
              
            />
          );
        })}
        </Box>

      </Dialog>
    </Box>
  );
};

export default PropertyDetailsAndImages;
