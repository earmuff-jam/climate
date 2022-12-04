import { Box } from "@mui/material"
import SubscribeForm from "./SubscribeForm";

interface Iprops {
    title: string;
    desc: string;
    display: string;
}

const Body: React.FC<Iprops> = (props) => {
    const { title, desc, display } = props;
    return (
        <>
            <Box
                display={display}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="32vh"
            >
                <SubscribeForm
                    title={title}
                    titleVariant={"h4"}
                    desc={desc}
                    descVariant={"body2"}
                />
            </Box>
        </>
    )
};

export default Body;