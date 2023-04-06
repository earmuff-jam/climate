import { Divider } from "@mui/material";
import { TitleComponent } from "../components/Home/TitleComponent";
import FeedbackForm from '../containers/FeedbackContainer/FeedbackForm';

const RequestFeatures = () => {
  return (
    <>
      <TitleComponent title="Feedback" />
      <FeedbackForm />
    </>
  );
};

export default RequestFeatures;
