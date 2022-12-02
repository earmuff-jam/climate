import AddFeatureForm from "../components/Forms/AddFeatureForm";
import EmailForm from "../components/Forms/CallToActionForm";
import { TitleComponent } from "../components/Home/TitleComponent";

const RequestFeatures = () => {

    return (
        <>
            <TitleComponent title="Feedback" />
            <AddFeatureForm />
        </>
    )
};

export default RequestFeatures;