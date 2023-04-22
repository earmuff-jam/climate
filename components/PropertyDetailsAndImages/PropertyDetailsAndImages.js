import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { SupabaseClient, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import { AddRounded } from "@mui/icons-material";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
const PropertyDetailsAndImages = ({
  property, // property is an object with the following properties:
}) => {
  const supabaseClient = useSupabaseClient();
  
  const [propertyState, setPropertyState] = React.useState(property);
  useEffect(() => {
    setPropertyState(Object.assign({}, property));
  }, [property]);
  const [expanded, setExpanded] = React.useState([
    `panel${Math.floor(Math.random() * 4)}`,
  ]);
  const handleChange = (panel) => (event, isExpanded) => {
    // make a set of expanded panels
    const newExpanded = isExpanded
      ? [...expanded, panel]
      : expanded.filter((p) => p !== panel);
    setExpanded(newExpanded);
  };
  const [editProperty, setEditProperty] = React.useState({});

  const AddIcon = ({ panel, field }) => {
    return (
      <Tooltip title={`Add ${field}`}>
        <IconButton
          disabled={Object.keys(editProperty).length}
          onClick={() => openEditClickedPaned(panel, field)}
        >
          <AddRounded />
        </IconButton>
      </Tooltip>
    );
  };

  const openEditClickedPaned = (panel, field) => {
    setExpanded((prev) => [...prev, panel]);
    setEditProperty({
      field: field,
      value: property[field],
      touched: false,
      error: false,
      label: field,
    });
  };
  const AddingField = ({ panel, field }) => {
    if (!Object.keys(editProperty).length) return null;
    return (
      <TextField
        value={editProperty.value}
        label={editProperty.label}
        onChange={(e) =>
          setEditProperty((prev) =>
            Object.assign(prev, { value: e.target.value })
          )
        }
        error={editProperty.error}
        helperText={editProperty.error ? "Please enter a valid value" : ""}
        onBlur={() => setEditProperty({ ...editProperty, touched: true })}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setEditProperty({});
                setExpanded((prev) => prev.filter((p) => p !== panel));
                setPropertyState((prev) =>
                  Object.assign(prev, { [field]: editProperty.value })
                );
                saveToDatabase(field, editProperty.value);
              }}
            >
              <PublishRoundedIcon panel={panel} field={field} />
            </IconButton>
          ),
        }}
      />
    );
  };

  const saveToDatabase = async (field, value) => {
    const { data, error } = await supabaseClient
      .from("countries")
      .update({ [field]: value })
      .eq("id", 1)
      .select();
      console.log({ data, error });
  };

  const propertyDetailsRenderValues = useCallback(
    (panel) => {
      const AddressLine = ({ panel }) => (
        <p>
          <span>
            {propertyState.address || (
              <AddIcon panel={panel} field={"address"} />
            )}
          </span>
          <span>
            {propertyState.city || <AddIcon panel={panel} field={"city"} />}
          </span>
          <span>
            {propertyState.state || <AddIcon panel={panel} field={"state"} />}
          </span>
          <span>
            {propertyState.zip || <AddIcon panel={panel} field={"zip"} />}
          </span>
          <span>
            {propertyState.country || (
              <AddIcon panel={panel} field={"country"} />
            )}
          </span>
        </p>
      );
      return {
        name: propertyState.name || <AddIcon panel={panel} field={"name"} />,
        displayAddress: AddressLine(panel),
        description: propertyState.description || (
          <AddIcon panel={panel} field={"description"} />
        ),
      };
    },
    [propertyState]
  );

  return (
    <div>
      <Accordion
        expanded={expanded.includes("panel1")}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownRoundedIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h3" sx={{ width: "33%", flexShrink: 0 }}>
            {propertyDetailsRenderValues("panel1").name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {propertyDetailsRenderValues("panel1").displayAddress}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!editProperty.field && (
            <Typography>
              {propertyDetailsRenderValues("panel1").description}
            </Typography>
          )}
          {editProperty.field && (
            <AddingField panel="panel1" field={editProperty.field} />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel2")}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownRoundedIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel3")}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownRoundedIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel4")}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownRoundedIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PropertyDetailsAndImages;
