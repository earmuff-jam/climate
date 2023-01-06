import {
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Box } from "@mui/system";
import Idea from "../components/Feedback/Idea";
import RequestFeedback from "../components/Forms/RequestFeedback";
import FeedbackHeader from "../components/Feedback/FeedbackHeader";
import { TitleComponent } from "../components/Home/TitleComponent";
import Image from "next/image";

const feedbackComponentSx = (onlySmallScreen: boolean) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  p: onlySmallScreen ? 1 : 12,
});

const RequestFeatures = () => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <TitleComponent title="Feedback" />
      <Box sx={feedbackComponentSx(onlySmallScreen)}>
        <Grid
          container
          justifyContent={"center"}
          spacing={1}
        >
          <Grid item xs={12} md={6}>
            <FeedbackHeader />
          </Grid>
          <Grid item xs={12} md={6}>
            <Idea />
          </Grid>
          <Grid item xs={12} md={6}>
            <RequestFeedback />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                alt="image"
                src={"/feedback_image.jpeg"}
                width={450}
                height={450}
                style={{
                  position: "relative",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RequestFeatures;