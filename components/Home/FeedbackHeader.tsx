import React from "react";
import { Typography } from "@mui/material";
import IdeaWithText from "../Idea/IdeaWithText";

const FeedbackHeader: React.FC = () => {
  return (
    <>
      <main>
        <Typography variant="h4" gutterBottom={true} color={'primary.main'}>
          Product Feedback
        </Typography>
        <Typography variant="body1" gutterBottom={true}>
          Climate strives to bring the best experience during your item
          management.
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom={false}>
          With a potential to impact billions, Climate welcomes your feedback on
          its products.
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom={true}>
          Please fill the form below
        </Typography>
        <Typography variant="body2" gutterBottom>
          We read all feedback carefully, however due to the nature of feedbacks,<br />
          we would be unable to respond to each submission individually. If you provide <br />
          your email address we might reach out to you with more information.
        </Typography>
        <IdeaWithText />
        <br />
      </main>
    </>
  );
};

export default FeedbackHeader;
