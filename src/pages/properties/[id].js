import { withRouter } from "next/router";
import PublicLayout from "@/components/Auth/PublicLayout";
import PropertyTitle from "@/components/Properties/PropertyDetails/PropertyTitle";
import PropertyDetails from "@/components/Properties/PropertyDetails/PropertyDetails";
import Schools from "@/components/Properties/PropertyDetails/School";
import GettingAround from "@/components/Properties/PropertyDetails/GettingAround";
import MiniMapLocation from "@/components/Properties/PropertyDetails/MiniMapLocation";
import PropertyHighlight from "@/components/Properties/PropertyDetails/PropertyHighlight";
import { usePropertyDetailsConfig } from "@/components/Properties/PropertyDetails/Hooks";

const IndividualProperty = (props) => {
  const propertyId = props.router.query.id;
  const { singleProperty } = usePropertyDetailsConfig(propertyId);

  if (!propertyId) return null;

  console.log(singleProperty);
  return (
    <div className="flex flex-col gap-2 p-10 bg-red-200">
      <PropertyTitle />
      <PropertyHighlight />
      <PropertyDetails />
      <Schools />
      <GettingAround />
      <MiniMapLocation />
    </div>
  );
};

export default withRouter(IndividualProperty);

IndividualProperty.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>;
};
