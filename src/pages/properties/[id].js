import { withRouter } from "next/router";
import PublicLayout from "@/components/Auth/PublicLayout";

const IndividualProperty = (props) => {
  const propertyId = props.router.query.id;

  if (!propertyId) return null;

  return <>Display property based on id - {propertyId}</>;
};

export default withRouter(IndividualProperty);

IndividualProperty.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>;
};
