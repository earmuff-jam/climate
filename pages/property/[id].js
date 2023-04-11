import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import default_img_property from "../../public/default_img_property.jpeg";
import Image from "next/image";
import PropertyReport from "../../containers/PropertiesContainer/PropertyReport";
import PaymentHistory from "../../containers/PropertiesContainer/PaymentHistory";
import { payments } from "../../containers/HomeContainer/constants";
import { useBuildPropertyDetails } from "../../containers/PropertiesContainer/PropertyContainerHooks";

const PropertyDetails = () => {
  const router = useRouter();
  const route_id = router.query.id;
  const { property } = useBuildPropertyDetails(route_id);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia alt={property.name}>
          <Image
            src={property.image || default_img_property}
            width={768}
            height={200}
            alt="a generic image of a property or the specific image of the property that the owner has uploaded"
            objectFit="contain" // or objectFit="cover"
          />
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${property.city}, ${property.state} ${property.zipcode}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${property.sqft} sq. ft. | ${property.numberofbedrooms} beds | ${property.numberofbathrooms} baths`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Built in ${property.yearbuilt} | ${property.garage} car garage`}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {`${property.city}, ${property.state}`}
          </Typography>
          <Button variant="contained" color="primary" startIcon={<Share />}>
            Share with Friends
          </Button>
        </Box>
      </Card>
      <PaymentHistory payments={payments} />
      <PropertyReport property={property} />
    </Box>
  );
};

export default PropertyDetails;
