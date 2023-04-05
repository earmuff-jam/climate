import { Autocomplete, Box, TextField, useTheme } from '@mui/material';
import React from 'react';


const autoCompleteStylesSx = (theme) => ({
    margin: theme.spacing(1),
    width: theme.spacing(60),
});


const SearchBar = () => {

    const theme = useTheme();
    const searchBarOptions = ['list of things in their inventory'];

    return (
        <Box>
            <Autocomplete
                id="combo-box-demo"
                options={searchBarOptions}
                renderInput={(params) => <TextField
                    {...params}
                    label="Search"
                    variant='standard'
                />
                }
                sx={autoCompleteStylesSx(theme)}
            />
        </Box>
    )
};

export default SearchBar;