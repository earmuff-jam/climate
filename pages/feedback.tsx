import Image from "next/image";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import { TitleComponent } from "../components/Home/TitleComponent";
import FeedbackHeader from "../components/Home/FeedbackHeader";
import RoiCalculator from "../components/Forms/RoiCalculator";

const RequestFeatures = () => {

  const defaultInputRowsAllowed = 4;
  const requestFeatureEmailInputLabel = "Email Address";
  const requestFeatureInputNoErrMsg = "Please add more details";
  const requestFeatureInputLabel = "How can we make the application better? *";
  const requestFeatureInputErrMsg =
    "Add more details, as we don't know about your problem";
  const requestFeatureEmailInputHelper =
    "We will let you know when we fix the issue";

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #666',
  };

  return (
    <>
      <TitleComponent title="Feedback" />
      <Grid container spacing={2} padding={1}>
        <Grid item md={6} xs={9}>
          <FeedbackHeader />
        </Grid>
        <Grid item md={6} xs={3}>
          <Box sx={{ p: 2, borderRadius: '8rem' }}>
            <Image src='/female.jpeg' alt='image of a female behind a tree that looks beautiful' width={280} height={280} style={imageStyle} />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ p: 2, }}>
            <AddFeatureForm
              requestFeatureInputLabel={requestFeatureInputLabel}
              defaultInputRowsAllowed={defaultInputRowsAllowed}
              requestFeatureInputNoErrMsg={requestFeatureInputNoErrMsg}
              requestFeatureInputErrMsg={requestFeatureInputErrMsg}
              requestFeatureEmailInputLabel={requestFeatureEmailInputLabel}
              requestFeatureEmailInputHelper={requestFeatureEmailInputHelper}
            />
          </Box>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <RoiCalculator elevation={1} innerPadding={1} />
        </Grid>
      </Grid>
    </>
  );
};

export default RequestFeatures;
