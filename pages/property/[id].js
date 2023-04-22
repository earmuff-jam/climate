import { Box, Button, Card } from "@mui/material";
import { Share } from "@mui/icons-material";
import { useRouter } from "next/router";
import default_img_property from "../../public/default_img_property.jpeg";
import PropertyReport from "../../components/PropertiesComponent//PropertyReport";
import PaymentHistory from "../../components/PropertiesComponent/PaymentHistory";
import { payments } from "../../containers/HomeContainer/constants";
import { useBuildPropertyDetails } from "../../containers/PropertiesContainer/PropertyContainerHooks";
import PropertyDetailsAndImages from "../../components/PropertyDetailsAndImages/PropertyAddress";
import PropertyLocation from "../../components/PropertyLocation/PropertyLocation";

const PropertyDetails = () => {
  const router = useRouter();
  const route_id = router.query.id;
  const { property } = useBuildPropertyDetails(route_id);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <PropertyDetailsAndImages property={property} />
        <PropertyLocation property={property} />
      </Box>

      <>tenant details and history </>
      <PaymentHistory payments={payments} />
      <PropertyReport property={Object.assign({}, property)} />
    </Box>
  );
};

export default PropertyDetails;
