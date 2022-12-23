import {
  Input,
  Snackbar,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import React from "react";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import RatingButtons from "../Button/RatingButtons";
import { useRequestFeatureForm } from "./CallToActionHook";

const RequestFeedback = () => {
  const requestFeatureInputNoErrMsg = "Please add more details";
  const requestFeatureInputErrMsg =
    "Add more details, as we don't know about your problem";

  const router = useRouter();
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

  const sendRequestFeatureToDb = async (
    featureDesc: string,
    email: string,
    ratingVal: string
  ) => {
    const data = await fetch("api/request_features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ featureDesc, email, ratingVal }),
    });
    return data;
  };

  const handleSubmit = (): void => {
    if (featureDesc.length > 10) {
      sendRequestFeatureToDb(featureDesc, emailDesc, rating);
      setFeatureDesc("");
      setEmailDesc("");
      setRating("3");
      handleError(false);
      handleSnackbar(true);
      router.push("/");
    }
    handleError(true);
    return;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Box component="form">
        <FormControl fullWidth error={error} variant="standard">
          <InputLabel htmlFor="component-helper">
            How can we make climate better?*
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
            {error ? requestFeatureInputNoErrMsg : requestFeatureInputErrMsg}
          </FormHelperText>

          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="component-helper">
              Email Address
            </InputLabel>
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
              We will let you know when we fix the issue
            </FormHelperText>
          </FormControl>
          <br />
          <RatingButtons
            value={rating}
            label={"How urgent would you rate this issue?"}
            row={true}
            display={"flex"}
            flexDirection={"column"}
            handleChange={setRating}
          />
        </FormControl>
      </Box>

      <Stack
        direction={"row"}
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => handleSnackbar(false)}
        message={"Thank you for submitting your response."}
      />
    </Box>
  );
};

export default RequestFeedback;
