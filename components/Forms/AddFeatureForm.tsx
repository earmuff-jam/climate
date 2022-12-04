import {
    Input,
    Snackbar,
    InputLabel,
    FormControl,
    useMediaQuery,
    FormHelperText,
} from "@mui/material";

import React from "react";
import Btn from "../Button/Btn";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import RatingButtons from "./RatingButtons";
import BodyHeaderContent from "../Home/BodyHeaderContent";
import { useRequestFeatureForm } from "./CallToActionHook";

const AddFeatureForm: React.FC = () => {
    const router = useRouter();
    const mediumSizeOrHigher = useMediaQuery("(min-width:768px)");
    const [
        featureDesc,
        setFeatureDesc,
        emailDesc,
        setEmailDesc,
        rating,
        setRating,
        error,
        handleError,
        openSnackbar,
        handleSnackbar,
    ] = useRequestFeatureForm();

    const sendRequestFeatureToDb = async (featureDesc: string, email: string, ratingVal: string) => {
        const data = await fetch('api/request_features', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ featureDesc, email, ratingVal })
        });
        return data;
    };

    const handleSubmit = (e: React.MouseEvent) => {
        if (featureDesc.length > 10) {
            sendRequestFeatureToDb(featureDesc, emailDesc, rating);
            setFeatureDesc("");
            setEmailDesc("");
            setRating("5");
            handleError(false);
            handleSnackbar(true);
            router.push("/");
        }
        handleError(true);
        return;
    }

    const handleCancel = () => {
        setFeatureDesc("");
        setEmailDesc("");
        setRating("5");
        handleError(false);
        router.push("/");
    }

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
                            value={featureDesc}
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
                                    setFeatureDesc(e.target.value);
                                    handleError(false);
                                }
                            }}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText id="component-helper-text">
                            {
                                error ? 'Please add more details' : 'All submitted comments will remain anonymous.'
                            }
                        </FormHelperText>

                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="component-helper">Email Address</InputLabel>
                            <Input
                                id="component-helper"
                                value={emailDesc}
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
                                        setEmailDesc(e.target.value);
                                    }
                                }}
                                aria-describedby="component-helper-text"
                            />
                            <FormHelperText id="component-helper-text">
                                Participation is 100 % free and voluntary.
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <RatingButtons value={rating} handleChange={setRating} />
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20vh' }}>
                    <Btn onClick={handleSubmit}>Submit</Btn>
                    <Btn onClick={handleCancel}>Cancel</Btn>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => handleSnackbar(false)}
                    message={'Thank you for submitting your response.'}
                />
            </Box>
        </>
    )
};

export default AddFeatureForm;