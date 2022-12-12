import Image from "next/image";
import { Box } from "@mui/system";
import Idea from "../components/Idea/Idea";
import { Divider, Grid, Paper } from "@mui/material";
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import { TitleComponent } from "../components/Home/TitleComponent";
import BodyHeaderContent from "../components/Home/BodyHeaderContent";

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
          <BodyHeaderContent />
        </Grid>
        <Grid item md={6} xs={3}>
          <Box sx={{ p: 2, borderRadius: '8rem' }}>
            <Image src='/female.jpeg' alt='image of a female behind a tree that looks beautiful' width={280} height={280} style={imageStyle} />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <AddFeatureForm
              requestFeatureInputLabel={requestFeatureInputLabel}
              defaultInputRowsAllowed={defaultInputRowsAllowed}
              requestFeatureInputNoErrMsg={requestFeatureInputNoErrMsg}
              requestFeatureInputErrMsg={requestFeatureInputErrMsg}
              requestFeatureEmailInputLabel={requestFeatureEmailInputLabel}
              requestFeatureEmailInputHelper={requestFeatureEmailInputHelper}
            />
          </Paper>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Idea />
        </Grid>
      </Grid>
    </>
  );
};

export default RequestFeatures;


{/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>

  </Box> */}