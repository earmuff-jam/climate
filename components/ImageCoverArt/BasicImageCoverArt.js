import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    description: "Beautiful sunset over the mountains",
  },
  {
    original: "https://picsum.photos/id/1009/1000/600/",
    thumbnail: "https://picsum.photos/id/1009/250/150/",
    description: "Majestic waterfall in the forest",
  },
  {
    original: "https://picsum.photos/id/1025/1000/600/",
    thumbnail: "https://picsum.photos/id/1025/250/150/",
    description: "Colorful hot air balloons in the sky",
  },
];

const BasicImageCoverArt = ({ property }) => {
  const [showIndex, setShowIndex] = useState(false);
  const [showBullets, setShowBullets] = useState(true);
  const [showDescriptions, setShowDescriptions] = useState(true);
  const hide = false;

  const toggleShowIndex = () => {
    setShowIndex(!showIndex);
  };

  const toggleShowBullets = () => {
    setShowBullets(!showBullets);
  };

  const toggleShowDescriptions = () => {
    setShowDescriptions(!showDescriptions);
  };

  return (
    <Box display="flex" flexGrow={1}>
      <Box>
        <Box
          sx={{
            zIndex: 3,
          }}
        >
        </Box>

        {hide && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(0, 0, 0, 0.5)"
            color="white"
            textAlign="center"
            p={4}
            sx={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%), url('/my-image.jpg') center/cover`,
              backgroundBlendMode: "multiply",
              zIndex: 2,
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {property.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${property.address}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${property.sqft} sq. ft. | ${property.numberofbedrooms} beds | ${property.numberofbathrooms} baths`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Built in ${property.yearbuilt} | ${property.garage} car garage`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${property.address}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BasicImageCoverArt;
