
import React from 'react';
import Chart from 'chart.js/auto'; // do not remove
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

const formattedData = {
    labels: ['food', 'garage', 'pantry'],
    datasets: [{
        label: 'Total Items by tags',
        data: [12, 3, 4],
    },
    {
        label: 'Expired Items by tags',
        data: [6, 1, 3],
    }
]};

const Improvements = () => {

    const theme = useTheme();
    return (
        <Box
            sx={{ height: '430px', width: '768px'}}
        >
            <Bar
                data={formattedData}
            />
        </Box>
    )
};

export default Improvements;