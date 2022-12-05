import { Divider } from "@mui/material";
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import BodyHeaderContent from "../components/Home/BodyHeaderContent";
import { TitleComponent } from "../components/Home/TitleComponent";

const RequestFeatures = () => {
  const defaultInputRowsAllowed = 4;
  const requestFeatureEmailInputLabel = "Email Address";
  const requestFeatureInputNoErrMsg = "Please add more details";
  const requestFeatureInputLabel = "How can we make the application better? *";
  const requestFeatureInputErrMsg =
    "Add more details, as we don't know about your problem";
  const requestFeatureEmailInputHelper =
    "We will let you know when we fix the issue";

  return (
    <>
      <TitleComponent title="Feedback" />
      <BodyHeaderContent />
      <Divider />
      <AddFeatureForm
        requestFeatureInputLabel={requestFeatureInputLabel}
        defaultInputRowsAllowed={defaultInputRowsAllowed}
        requestFeatureInputNoErrMsg={requestFeatureInputNoErrMsg}
        requestFeatureInputErrMsg={requestFeatureInputErrMsg}
        requestFeatureEmailInputLabel={requestFeatureEmailInputLabel}
        requestFeatureEmailInputHelper={requestFeatureEmailInputHelper}
      />
      <br />
      <br />
    </>
  );
};

export default RequestFeatures;
