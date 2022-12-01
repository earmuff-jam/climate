import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, Radio, RadioGroup, Snackbar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import BodyHeaderContent from "../Home/BodyHeaderContent";
import { useAddFeatureForm } from "./CallToActionHook";

const AddFeatureForm: React.FC = () => {
    const mediumSizeOrHigher = useMediaQuery("(min-width:768px)");
    const [subject, data, error, opensnackbar, handleSubject, handleSubmit, handleCancel, closesnackbar] = useAddFeatureForm();

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <BodyHeaderContent />
                <Box component="form" minWidth={mediumSizeOrHigher ? '100vh' : '50vh'}>
                    <FormControl fullWidth error={error} variant="standard">
                        <InputLabel htmlFor="component-helper">
                            How can we make the application better ?
                        </InputLabel>
                        <Input
                            id="component-helper"
                            multiline
                            rows={4}
                            maxRows={4}
                            value={data}
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
                                    handleSubject(e.target.value);
                                }
                            }}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText id="component-helper-text">
                            {
                                error ? 'Please add more details' : 'All submitted comments will remain anonymous.'
                            }
                        </FormHelperText>
                        <br />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <FormLabel id="row-radio-group">Please rate us</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue={5}
                                row={true}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="1" />
                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                <FormControlLabel value="3" control={<Radio />} label="3" />
                                <FormControlLabel value="4" control={<Radio />} label="4" />
                                <FormControlLabel value="5" control={<Radio />} label="5" />
                            </RadioGroup>
                        </Box>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20vh' }}>
                    <Button variant="text" onClick={(e) => handleSubmit(e)}>
                        {" "}
                        Submit{" "}
                    </Button>
                    <Button variant="text" onClick={handleCancel}>
                        {" "}
                        Cancel{" "}
                    </Button>
                </Box>
                <Snackbar
                    open={opensnackbar}
                    autoHideDuration={3000}
                    onClose={closesnackbar}
                    message={'Thank you for submitting your response.'}
                />
            </Box>
        </>
    )
};

export default AddFeatureForm;