import { Box } from "@mui/system";
import Text from "../components/Typography/Text";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddFeatureForm from "../components/Forms/AddFeatureForm";
import { Divider, Grid, Paper, Typography } from "@mui/material";
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

  return (
    <>
      <TitleComponent title="Feedback" />
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <BodyHeaderContent />
        <Divider />
        <Grid container spacing={3} sx={{ padding: '2vh 0vh', alignItems:"center" }}>
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
              borderRadius: '0.7vh',
              backgroundColor: '#F5F5F7',
            }}>
              <LightbulbIcon fontSize="large" />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F5F5F7',
              }}>
                <br />
                <Text variant="h6" justifyContent="left">Have an idea that you want alive? </Text>
                <Typography variant="body1" justifyContent="center"> Submit your suggestion on climate.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RequestFeatures;
