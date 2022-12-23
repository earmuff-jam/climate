import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const FeedbackHeader = () => {

    return (
        <Stack>
            <Typography
                variant="h2"
                gutterBottom
            > Climate
            </Typography>
            <Typography
                variant="body1"
            > With a potential to impact billions, Climate welcomes your feedback on its products.
            </Typography>

            <br />

            <Typography
                gutterBottom
            >
                Begin by using the form below. Submitting this form does not guarentee
                a response from us. However, we do read each feedback carefully. To
                keep yourself updated with the changes in your feeback and our
                response, please be sure to add your email address during your form
                submission process.
            </Typography>
        </Stack>
    )
};

export default FeedbackHeader;