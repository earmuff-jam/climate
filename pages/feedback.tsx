import {
  Grid,
} from "@mui/material";

import { Box } from "@mui/system";
import Idea from "../components/Feedback/Idea";
import RoiCalculator from "../components/Feedback/RoiCalculator";
import AddFeatureForm from "../components/Forms/RequestFeedback";
import FeedbackHeader from "../components/Feedback/FeedbackHeader";
import { TitleComponent } from "../components/Home/TitleComponent";

const RequestFeatures = () => {

  return (
    <>
      <TitleComponent title="Feedback" />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 12,
      }}>
        <Grid
          container
          spacing={1}
          >
          <Grid item xs={12} md={6}>
            <FeedbackHeader />
          </Grid>
          <Grid item xs={12} md={6}>
            <Idea />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddFeatureForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <RoiCalculator />
          </Grid>

        </Grid>
      </Box>

    </>
  );
};

export default RequestFeatures;