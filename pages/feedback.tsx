import { Box } from "@mui/system";
import Idea from "../components/Idea/Idea";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import { TitleComponent } from "../components/Home/TitleComponent";
import BodyHeaderContent from "../components/Home/BodyHeaderContent";
import Image from "next/image";

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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
          <BodyHeaderContent />
          <Box sx={{ p: 2, borderRadius: '8rem' }}>
            <Image src='/female.jpeg' alt='image of a female behind a tree that looks beautiful' width={280} height={280} style={imageStyle} />
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <Idea />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RequestFeatures;
