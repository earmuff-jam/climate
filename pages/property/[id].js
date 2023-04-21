import { Box, Button, Card } from "@mui/material";
import { Share } from "@mui/icons-material";
import { useRouter } from "next/router";
import default_img_property from "../../public/default_img_property.jpeg";
import PropertyReport from "../../components/PropertiesComponent//PropertyReport";
import PaymentHistory from "../../components/PropertiesComponent/PaymentHistory";
import { payments } from "../../containers/HomeContainer/constants";
import { useBuildPropertyDetails } from "../../containers/PropertiesContainer/PropertyContainerHooks";
import BasicImageCoverArt from "../../components/ImageCoverArt/BasicImageCoverArt";

const PropertyDetails = () => {
  const router = useRouter();
  const route_id = router.query.id;
  const { property } = useBuildPropertyDetails(route_id);
  return (
    <Box>
      <BasicImageCoverArt
        property={property}
        imageProps={{
          src: property.image || default_img_property,
          alt: "a generic image of a property or the specific image of the property that the owner has uploaded",
        }}
      />
      <>tenant details and history </>
      <PaymentHistory payments={payments} />
      <PropertyReport property={property} />
    </Box>
  );
};

export default PropertyDetails;
