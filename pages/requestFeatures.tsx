import AddFeatureForm from "../components/Forms/AddFeatureForm";
import { TitleComponent } from "../components/Home/TitleComponent";

const RequestFeatures = () => {

    const defaultInputRowsAllowed = 4;
    const requestFeatureEmailInputLabel = 'Email Address';
    const requestFeatureInputNoErrMsg = 'Please add more details';
    const requestFeatureInputLabel = 'How can we make the application better?';
    const requestFeatureInputErrMsg = 'All submitted comments will remain anonymous.';
    const requestFeatureEmailInputHelper = 'Participation is 100 % free and voluntary.';

    return (
        <>
            <TitleComponent title="Feedback" />

            <AddFeatureForm
                requestFeatureInputLabel={requestFeatureInputLabel}
                defaultInputRowsAllowed={defaultInputRowsAllowed}
                requestFeatureInputNoErrMsg={requestFeatureInputNoErrMsg}
                requestFeatureInputErrMsg={requestFeatureInputErrMsg}
                requestFeatureEmailInputLabel={requestFeatureEmailInputLabel}
                requestFeatureEmailInputHelper={requestFeatureEmailInputHelper}
            />
        </>
    )
};

export default RequestFeatures;