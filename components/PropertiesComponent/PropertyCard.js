import Link from "next/link";
import Image from "next/image";
import { InfoRounded } from "@mui/icons-material";
import { CardMedia, Typography, IconButton, styled } from "@mui/material";
import default_img_property from "../../public/default_img_property.jpeg";

const PropertyCardWrapperStyled = styled("div")({
  display: "flex",
  flexDirection: "row",
  border: "0.1rem solid #E5E5E5",
  borderRadius: "0.2rem",
});

const PropertyImageWrapperStyled = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
});
const PropertyDetailsContentStyled = styled("div")({
  flex: "1 0 auto",
  textAlign: "left",
});
const PropertyTitleWrapperStyled = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const PropertyTitleStyled = styled("div")({
  fontVariant: "h6",
  fontWeight: 500,
  lineHeight: "28px",
  mb: "8px",
});

const PropertyCard = ({ property, index }) => {
  return (
    <PropertyCardWrapperStyled>
      <CardMedia
        alt={property.name}
        sx={{
          width: { xs: 100, md: 100 },
          maxHeight: 100,
          maxWidth: 100,
          m: 1,
        }}
      >
        <PropertyImageWrapperStyled>
          {property?.image && (
            <Image
              src={property.image || default_img_property}
              width={"100"}
              height={"100"}
              alt="a generic image of a property or the specific image of the property that the owner has uploaded"
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}
        </PropertyImageWrapperStyled>
      </CardMedia>
      <PropertyDetailsContentStyled>
        <PropertyTitleWrapperStyled>
          <Link href={`/property/${property.id}`}>
            <PropertyTitleStyled>{property.name}</PropertyTitleStyled>
          </Link>
          <IconButton>
            <InfoRounded />
          </IconButton>
        </PropertyTitleWrapperStyled>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "11rem",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 300,
              mr: "1rem",
              fontStyle: "italic",
            }}
            noWrap
          >
            {property.address}
          </Typography>
        </div>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 200,
            lineHeight: "24px",
            mb: "0.1rem",
          }}
        >
          {property.sqft} sq ft | {property.numberofbedrooms} bed |{" "}
          {property.numberofbathrooms} bath
        </Typography>
        <br />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 200, lineHeight: "12px" }}
        >
          Built in {property.yearbuilt} | Garage: {property.garage}
        </Typography>
      </PropertyDetailsContentStyled>
    </PropertyCardWrapperStyled>
  );
};

export default PropertyCard;