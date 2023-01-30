
import { Box, FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const options = [
    { value: "24", display: "24 hours", helperText: "24 hours" },
    { value: "7", display: "7 days", helperText: "7 days" },
    { value: "60", display: "60 minutes", helperText: "60 minutes" },
    { value: "30", display: "30 minutes", helperText: "30 minutes" },
];

const selectDropdownSx = {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "1vh",
};

const ImprovementSelector = () => {

    const [value, setValue] = useState({
        value: "24",
        display: "24 hours",
        helperText: "24 hours",
    });

    const handleChange = (e) => {
        const newVal = options.find((x) => x.value === e.target.value);
        setValue({
            display: newVal?.display,
            value: newVal?.value,
            helperText: newVal?.helperText,
        });
    };
    return (
        <>
            <FormControl sx={{ m: 1 }}>
                <Box sx={selectDropdownSx}>
                    <Select
                        size="small"
                        value={value.value}
                        onChange={(e) => handleChange(e)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        {options.map((v) => (
                            <MenuItem key={v.value} value={v.value}>{v.display}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        Items with warning within {value.helperText}
                    </FormHelperText>
                </Box>
            </FormControl>
        </>
    )
};

export default ImprovementSelector;