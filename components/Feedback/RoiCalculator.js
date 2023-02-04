import {
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Projector from './Projector';

import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import Looks3RoundedIcon from '@mui/icons-material/Looks3Rounded';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';


const RoiCalculator = ({
    taxSavings = 0.021,
    auditSavings = 2523,
}) => {

    const theme = useTheme();
    const [userCount, setUserCount] = useState('');
    const [itemCount, setItemsCount] = useState('');

    const [emailChip, setEmailChip] = useState(false);
    const [avgAssetVal, setAvgAssetVal] = useState('');
    const [avgBrokenProducts, setAvgBrokenProducts] = useState('');
    const [displayChart, setDisplayChart] = useState(false);

    const [touchedAllFields, setTouchedAllFields] = useState([
        { id: 1, touched: false },
        { id: 2, touched: false },
        { id: 3, touched: false },
        { id: 4, touched: false },
    ]);

    const roiFields = [
        {
            id: 1,
            label: 'Household members',
            variant: 'standard',
            value: userCount,
            icon: <FamilyRestroomRoundedIcon />,
            setValue: (val) => (setUserCount(val)),
            isFilled: (id) => setTouchedAllFields(() => {
                const oldFields = [...touchedAllFields];
                const field = touchedAllFields.find(tf => tf.id === id);
                field.touched = true;
                return oldFields;
            }),
        },
        {
            id: 2,
            label: 'Asset Value',
            variant: 'standard',
            value: avgAssetVal,
            icon: <Looks3RoundedIcon />,
            setValue: (val) => (setAvgAssetVal(val)),
            isFilled: (id) => setTouchedAllFields(() => {
                const oldFields = [...touchedAllFields];
                const field = touchedAllFields.find(tf => tf.id === id);
                field.touched = true;
                return oldFields;
            }),
        },
        {
            id: 3,
            label: 'Inventory Count',
            variant: 'standard',
            value: itemCount,
            icon: <PaidRoundedIcon />,
            setValue: (val) => (setItemsCount(val)),
            isFilled: (id) => setTouchedAllFields(() => {
                const oldFields = [...touchedAllFields];
                const field = touchedAllFields.find(tf => tf.id === id);
                field.touched = true;
                return oldFields;
            }),
        },
        {
            id: 4,
            label: 'Expected faults',
            variant: 'standard',
            value: avgBrokenProducts,
            icon: <ErrorOutlineRoundedIcon />,
            setValue: (val) => (setAvgBrokenProducts(val)),
            isFilled: (id) => setTouchedAllFields(() => {
                const oldFields = [...touchedAllFields];
                const field = touchedAllFields.find(tf => tf.id === id);
                field.touched = true;
                return oldFields;
            }),
        },
    ];

    const emailTooltipTitle = emailChip ? 'Disable estimated sharings' : 'Click to share estimated savings';

    const sendReportToEmail = () => {
        setEmailChip(!emailChip);
    };

    const handleRoiFieldsChanged = (ev, rf) => {
        rf?.setValue(ev?.target.value);
        rf?.isFilled(rf.id);
    };

    const totalSavedInDollars = (auditSavings + (parseInt(itemCount) * parseInt(avgAssetVal) * taxSavings) - parseInt(avgBrokenProducts));

    const taxSavingsInPercentage = (parseInt(itemCount) * taxSavings * (parseInt(avgAssetVal)));

    useEffect(() => {
        const displayChart = touchedAllFields.map(dv => dv.touched).filter(Boolean).length === 4;
        setDisplayChart(displayChart);
    }, [JSON.stringify(touchedAllFields)]);

    return (
        <Paper
            sx={{ padding: theme.spacing(1) }}
        >
            <Grid container
                sx={{
                    mb: 2,
                }}
            >
                <Grid item xs={12} md={6}>
                    <Typography
                        sx={{ fontSize: theme.spacing(2.5) }}
                    >
                        <IconButton>
                            <CalculateRoundedIcon />
                        </IconButton>
                        Digital savings calculator
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.secondary.main,
                        }}
                        gutterBottom
                    >
                        Project your estimated savings within minutes.
                    </Typography>
                    <Grid
                        container
                        sx={{ mt: 3, gap: 1, }}
                    >
                        {
                            roiFields?.map(rf => (
                                <Grid
                                    key={rf.id}
                                    item xs={4}
                                >
                                    <TextField
                                        label={rf.label}
                                        variant={rf.variant}
                                        color="info"
                                        value={rf.value}
                                        gutterBottom
                                        onBlur={(ev) => rf.isFilled(rf.id)}
                                        onChange={(ev) => handleRoiFieldsChanged(ev, rf)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {rf.icon}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={0} md={6}>
                    {
                        /* displayChart && */
                        <Projector
                            totalSavedInDollars={totalSavedInDollars}
                            taxSavingsInPercentage={taxSavingsInPercentage}
                            taxSavings={taxSavings}
                            auditSavings={auditSavings}
                            userCount={userCount}
                            itemCount={itemCount}
                            avgAssetVal={avgAssetVal}
                            avgBrokenProducts={avgBrokenProducts}
                        />
                    }
                </Grid>

            </Grid>


        </Paper>
    )
};

export default RoiCalculator;


// <Box sx={{
//     m: 1,
// }}>
//     <Tooltip title={emailTooltipTitle}>
//         <Chip
//             label='email'
//             sx={{
//                 backgroundColor: `${emailChip && theme.palette.secondary.main || theme.palette.info.main}`,
//                 color: theme.palette.common.white,
//                 width: theme.spacing(8),
//                 height: theme.spacing(3),
//                 borderRadius: theme.spacing(1),
//             }}
//             onClick={sendReportToEmail}
//         />
//     </Tooltip>
// </Box>