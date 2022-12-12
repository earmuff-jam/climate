import {
    Button,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

interface Iprops {
    taxSavings?: number;
    auditSavings?: number;
}

const RoiCalculator: React.FC<Iprops> = ({ taxSavings = 0.021, auditSavings = 2523 }) => {

    const [userCount, setUserCount] = useState<string>("1");
    const [itemCount, setItemsCount] = useState<string>("1");
    const [avgAssetVal, setAvgAssetVal] = useState<string>("1");
    const [avgBrokenProducts, setAvgBrokenProducts] = useState<string>('2');
    const [error, setError] = useState<boolean>(false);

    const handleError = (val: boolean) => setError(val);

    const handleSubmit = () => {
        setUserCount("0");
        setItemsCount("0");
        handleError(false);
    }

    const calculate = (): number => (auditSavings + (parseInt(itemCount) * parseInt(avgAssetVal) * taxSavings) - parseInt(avgBrokenProducts));
    const calculateTax = (): number => (parseInt(itemCount) * taxSavings * (parseInt(avgAssetVal)));
    return (
        <>
            <Typography variant="h6">Save with our ROI Calculator </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 6, padding: 1}}>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '2rem' }}>
                    <FormControl error={error} variant="standard">
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
                                if (e.target.value != " ") {
                                    setUserCount(e.target.value);
                                    handleError(false);
                                }
                            }}
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
                                if (e.target.value != " ") {
                                    setItemsCount(e.target.value);
                                    handleError(false);
                                }
                            }}
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
                                if (e.target.value != " ") {
                                    setAvgAssetVal(e.target.value);
                                    handleError(false);
                                }
                            }}
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
                                if (e.target.value != " ") {
                                    setAvgBrokenProducts(e.target.value);
                                    handleError(false);
                                }
                            }}
                            aria-describedby="component-helper-text"
                        />
                    </FormControl>
                </Box>
                <Paper elevation={3} sx={{p: 2, display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 2 }}>
                    <Tooltip title="Savings" placement="top-start">
                        <Typography variant="subtitle1">Savings</Typography>
                    </Tooltip>
                    <Typography variant="body1" color={'#1B82A8'}>${calculate().toFixed(2)}</Typography>
                    <Tooltip title="Tax Savings" placement="top-start">
                        <Typography variant="subtitle1">Tax Savings</Typography>
                    </Tooltip>
                    <Typography variant="body2" color={'#1B82A8'}>${calculateTax().toFixed(2)}</Typography>
                    <Tooltip title="Grand total saved" placement="top-start">
                        <Typography variant="h6">Total Saved</Typography>
                    </Tooltip>
                    <Typography variant="h4" color={'#1B82A8'}>${calculate().toFixed(2)}</Typography>
                </Paper>
            </Box>
            <br />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
            </Box>
        </>
    )
};

export default RoiCalculator;