import {
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";

interface Iprops {
    value: string;
    label: string;
    row: boolean;
    display: string;
    flexDirection: string;
    handleChange: Function;
};

const RatingButtons: React.FC<Iprops> = ({ value, label, row, display, flexDirection, handleChange }) => {
    return (
        <Box sx={{ display, flexDirection }}>
            <FormLabel id="row-radio-group">{label}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                value={value}
                row={row}
                onChange={(e) => handleChange(e.target.value)}
                name="radio-buttons-group"
            >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
        </Box>
    )
};

export default RatingButtons;