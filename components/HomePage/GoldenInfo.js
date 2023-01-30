
import React from 'react';

import {
    useTheme,
} from "@mui/material/styles";

import { Box, Divider } from '@mui/material';

const golderInfoSx = (theme) => ({
    minHeight: theme.spacing(12),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 2,
    textAlign: 'center',
    alignItems: 'center',
});

const goldenInfoItemSx = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    borderRight: `${theme.spacing(0.1)} solid ${theme.palette.secondary.main}`,
});

const GoldenInfo = () => {

    const theme = useTheme();
    const goldenHourData = ['All generic details about item', 'All generic details about category', 'All generic details about other stuffs'];

    return (
        <Box
            sx={golderInfoSx}
        >
            {
                goldenHourData?.map((dv, index) => (
                    <Box
                        key={index}
                        sx={goldenInfoItemSx}
                    >
                        {dv}
                    </Box>
                ))
            }
        </Box>
    )
};

export default GoldenInfo;