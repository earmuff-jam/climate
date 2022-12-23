import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import NumbersIconRoundedIcon from '@mui/icons-material/NumbersRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import Diversity1IconRoundedIcon from '@mui/icons-material/Diversity1Rounded';

interface Iprops {
    taxSavings?: number;
    auditSavings?: number;
    elevation?: number;
    innerPadding?: number;
}

const RoiCalculator: React.FC<Iprops> = ({
    taxSavings = 0.021,
    auditSavings = 2523,
    elevation = 2,
    innerPadding = 1
}) => {

    const [userCount, setUserCount] = useState<string>("1");
    const [itemCount, setItemsCount] = useState<string>("1");
    const [avgAssetVal, setAvgAssetVal] = useState<string>("1");
    const [avgBrokenProducts, setAvgBrokenProducts] = useState<string>('2');
    const [error, setError] = useState<boolean>(false);

    const handleError = (val: boolean): void => setError(val);

    const handleSubmit = (): void => {
        setUserCount("0");
        setItemsCount("0");
        handleError(false);
    }

    const calculate = (): number => (auditSavings + (parseInt(itemCount) * parseInt(avgAssetVal) * taxSavings) - parseInt(avgBrokenProducts));
    const calculateTax = (): number => (parseInt(itemCount) * taxSavings * (parseInt(avgAssetVal)));

    /**
     * method to filter any not a number property
     * @param action any function that solves to a value
     * @returns number or zero
     */
    const filterNaN = (action: Function): number => isNaN(action()) ? 0 : action();


    return (
        <Paper
            elevation={elevation}
            style={{ 
                padding: `${innerPadding}rem`,
                borderRadius: 12,
            }}
        >
            <Typography
                variant="h6"
                textAlign="left"
                color={'primary.main'}
            >Save with our ROI Calculator
            </Typography>

            <Typography
                variant="caption"
                textAlign="left"
                color={'secondary.main'}
            >
                Calculate total money saved
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    padding: 1
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}
                >
                    <FormControl
                        error={error}
                        variant="standard"
                    >
                        <InputLabel htmlFor="component-helper">
                            Household members
                        </InputLabel>
                        <Input
                            id="component-helper"
                            value={userCount}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                }
                                // ev.target.value -> results an error atm
                                // although i could ev.target.value in dev console
                                // this prevents onKeyDown to submit. accessibility issue ?
                            }}
                            onChange={(e) => {
                                if (e.target.value.match("^[0-9]*$") || [].length > 0) {
                                    setUserCount(e.target.value);
                                    handleError(false);
                                }
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Diversity1IconRoundedIcon />
                                </InputAdornment>
                            }
                            aria-describedby="component-helper-text"
                        />
                    </FormControl>
                    <FormControl error={error} variant="standard">
                        <InputLabel htmlFor="component-helper">
                            Total Items Count
                        </InputLabel>
                        <Input
                            id="component-helper"
                            value={itemCount}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                }
                                // ev.target.value -> results an error atm
                                // although i could ev.target.value in dev console
                                // this prevents onKeyDown to submit. accessibility issue ?
                            }}
                            onChange={(e) => {
                                if (e.target.value.match("^[0-9]*$") || [].length > 0) {
                                    setItemsCount(e.target.value);
                                    handleError(false);
                                }
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <NumbersIconRoundedIcon />
                                </InputAdornment>
                            }
                            aria-describedby="component-helper-text"
                        />
                    </FormControl>
                    <FormControl error={error} variant="standard">
                        <InputLabel htmlFor="component-helper">
                            Average Asset Value
                        </InputLabel>
                        <Input
                            id="component-helper"
                            value={avgAssetVal}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                }
                                // ev.target.value -> results an error atm
                                // although i could ev.target.value in dev console
                                // this prevents onKeyDown to submit. accessibility issue ?
                            }}
                            onChange={(e) => {
                                if (e.target.value.match("^[0-9]*$") || [].length > 0) {
                                    setAvgAssetVal(e.target.value);
                                    handleError(false);
                                }
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AttachMoneyRoundedIcon />
                                </InputAdornment>
                            }
                            aria-describedby="component-helper-text"
                        />
                    </FormControl>
                    <FormControl error={error} variant="standard">
                        <InputLabel htmlFor="component-helper">
                            Average Broken Products
                        </InputLabel>
                        <Input
                            id="component-helper"
                            value={avgBrokenProducts}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                }
                                // ev.target.value -> results an error atm
                                // although i could ev.target.value in dev console
                                // this prevents onKeyDown to submit. accessibility issue ?
                            }}
                            onChange={(e) => {
                                if (e.target.value.match("^[0-9]*$") || [].length > 0) {
                                    setAvgBrokenProducts(e.target.value);
                                    handleError(false);
                                }
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PercentRoundedIcon />
                                </InputAdornment>
                            }
                            aria-describedby="component-helper-text"
                        />
                    </FormControl>
                </Box>
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignSelf: 'center',
                        borderRadius: 2
                    }}
                >
                    <Tooltip
                        title="savings from audit process"
                        placement="top-start"
                    >
                        <Typography
                            variant="caption"
                        >
                            Audit Log Savings
                        </Typography>
                    </Tooltip>
                    <Typography
                        variant="body1"
                        color={'#1B82A8'}
                    >
                        ${filterNaN(calculate).toFixed(2)}
                    </Typography>
                    <Tooltip
                        title="savings from tax expenditures"
                        placement="top-start"
                    >
                        <Typography
                            variant="caption"
                        >Tax Savings
                        </Typography>
                    </Tooltip>
                    <Typography
                        variant="body2"
                        color={'#1B82A8'}
                    >
                        ${filterNaN(calculateTax).toFixed(2)}
                    </Typography>
                    <Tooltip
                        title="Grand total saved"
                        placement="top-start"
                    >
                        <Typography
                            variant="h6"
                        >
                            Total Saved
                        </Typography>
                    </Tooltip>
                    <Typography
                        variant="h6"
                        color={'#1B82A8'}
                    >
                        ${filterNaN(calculate).toFixed(2)}
                    </Typography>
                </Paper>
            </Box>
            <br />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
            </Box>
        </Paper>
    )
};

export default RoiCalculator;