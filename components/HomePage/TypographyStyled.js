import { Typography } from "@mui/material";
import {
    useTheme,
} from "@mui/material/styles";

export const TypographyStyled = (props) => {

    const theme = useTheme();

    const {
        weight = 400,
        fontSize = theme.spacing(1.6),
        children,
    } = props;

    return (
        <Typography
            sx={{
                fontSize: fontSize,
                fontWeight: weight,
            }}
        >
            {children}
        </Typography>
    )
};

