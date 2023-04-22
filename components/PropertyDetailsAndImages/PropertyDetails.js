import {
  BathroomOutlined,
  BathroomRounded,
  BedroomParentRounded,
  GarageRounded,
  GradingRounded,
  SquareFootRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const NumberedListItem = ({ number, icon, unit }) => {
  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontWeight: "bold",
            width: "100px",
            textAlign: "right",
          }}
        >
          {number}
        </Typography>
        {icon && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              margin: "0 5px",
              "&:hover": {
                cursor: "pen",
              },
            }}
          >
            {icon}
          </span>
        )}
        <Typography variant="body2" component="span" color="textSecondary" s>
          {unit}
        </Typography>
      </Box>
    </ListItem>
  );
};

const PropertyDetails = ({ property }) => {

  const { garage, id, numberofbathrooms, numberofbedrooms, sqft, yearbuilt } =
    property;

  return (
    <List dense disablePadding>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <Box>
          <NumberedListItem
            number={sqft}
            icon={<SquareFootRounded />}
            unit="Sqft"
          />
          <NumberedListItem
            number={numberofbedrooms}
            icon={<BedroomParentRounded />}
            unit="Bedrooms"
          />
          <NumberedListItem
            number={numberofbathrooms}
            icon={<BathroomRounded />}
            unit="Bathrooms"
          />
        </Box>
        <Box>
          {" "}
          <NumberedListItem
            number={yearbuilt}
            icon={<GradingRounded />}
            unit="Year Built"
          />
          <NumberedListItem
            number={garage}
            icon={<GarageRounded />}
            unit="Garage"
          />
        </Box>
      </Box>
    </List>
  );
};

export default PropertyDetails;
