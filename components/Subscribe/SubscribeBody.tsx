import { Box, Typography } from "@mui/material"
import EmailForm from "../Forms/CallToActionForm";

const SubscribeBody: React.FC = () => {

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="32vh"
            >
                <Typography variant="h4"> Subscription and Billing </Typography>
                <Typography variant="body1">
                    Learn more about how to start, stop or update a subscription.
                </Typography>
                <EmailForm />
            </Box>
        </>
    )
};

export default SubscribeBody;