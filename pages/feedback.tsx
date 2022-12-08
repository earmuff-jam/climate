import { Divider, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import BodyHeaderContent from "../components/Home/BodyHeaderContent";
import { TitleComponent } from "../components/Home/TitleComponent";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Text from "../components/Typography/Text";


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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <BodyHeaderContent />
        <Divider />
        <Grid container spacing={3} sx={{ padding: '2vh 0vh' }}>
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
            <Box sx={{
              display: 'flex',
              paddingBottom: '2vh',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: "center",
              textAlign: 'center',
              backgroundColor: '#F5F5F7',
            }}>
              <LightbulbIcon fontSize="large" />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '25%',
                backgroundColor: '#F5F5F7',
              }}>
                <br />
                <Text variant="h6" justifyContent="left">Have an idea that you want to see in light? </Text>
                <Text variant="body2" justifyContent="center"> You can submit your ideas on the suggestion box </Text>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RequestFeatures;
