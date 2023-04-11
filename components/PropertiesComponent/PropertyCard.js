import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import Image from "next/image";
import default_img_property from "../../public/default_img_property.jpeg";
import Link from "next/link";

const PropertyCard = ({ property, index }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        alt={property.name}
        sx={{ width: { xs: 100, md: 100 }, maxHeight: 100, maxWidth: 100 }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {property?.image && (
            <Image
              src={property.image || default_img_property}
              width={"100"}
              height={"100"}
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}
        </div>
      </CardMedia>
      <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href={`/property/${property.id}`}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, lineHeight: "28px", mb: "8px" }}
            >
              {property.name}
            </Typography>
          </Link>
          <IconButton>
            <InfoRounded />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, lineHeight: "24px" }}
        >
          {property.city}, {property.state} {property.zipcode}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 200, lineHeight: "24px", mb: "0.1rem" }}
        >
          {property.sqft} sq ft | {property.numberofbedrooms} bed |{" "}
          {property.numberofbathrooms} bath
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 200, lineHeight: "12px" }}
        >
          Built in {property.yearbuilt} | Garage: {property.garage}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
