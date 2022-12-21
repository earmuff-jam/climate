import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const Idea = () => {

    return (
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
                <Typography
                    variant="h6"
                    justifyContent="left"
                >
                    Have an idea that you want alive?
                </Typography>
                <Typography
                    variant="body1"
                    justifyContent="center"
                >
                    Submit your suggestion on climate.
                </Typography>
            </Box>
        </Box>
    )
};

export default Idea;