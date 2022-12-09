import {
  Input,
  Snackbar,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";

import React from "react";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import ButtonGroup from "../Button/ButtonGroup";
import RatingButtons from "../Button/RatingButtons";
import { useRequestFeatureForm } from "./CallToActionHook";
import Text from "../Typography/Text";

interface Iprops {
  requestFeatureInputLabel: string;
  defaultInputRowsAllowed: number;
  requestFeatureInputNoErrMsg: string;
  requestFeatureInputErrMsg: string;
  requestFeatureEmailInputLabel: string;
  requestFeatureEmailInputHelper: string;
}

const AddFeatureForm: React.FC<Iprops> = (props: Iprops) => {
  const {
    requestFeatureInputLabel,
    defaultInputRowsAllowed,
    requestFeatureInputNoErrMsg,
    requestFeatureInputErrMsg,
    requestFeatureEmailInputLabel,
    requestFeatureEmailInputHelper,
  } = props;

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

  const handleSubmit = (e: React.MouseEvent) => {
    if (featureDesc.length > 10) {
      sendRequestFeatureToDb(featureDesc, emailDesc, rating);
      router.push("/");
      setFeatureDesc("");
      setEmailDesc("");
      setRating("3");
      handleError(false);
      handleSnackbar(true);
    }
    handleError(true);
    return;
  };

  const handleCancel = () => {
    router.push("/");
    setFeatureDesc("");
    setEmailDesc("");
    setRating("3");
    handleError(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Text variant={"h4"} gutterBottom={true}>
          Climate
        </Text>
        <Box component="form">
          <FormControl fullWidth error={error} variant="standard">
            <InputLabel htmlFor="component-helper">
              {requestFeatureInputLabel}
            </InputLabel>
            <Input
              id="component-helper"
              multiline
              rows={defaultInputRowsAllowed}
              maxRows={defaultInputRowsAllowed}
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
                {requestFeatureEmailInputLabel}
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
                {requestFeatureEmailInputHelper}
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
        <br />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2vh', justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => handleSnackbar(false)}
          message={"Thank you for submitting your response."}
        />
      </Box>
    </>
  );
    setRating("5");
    handleError(false);
    router.push("/");
  };

export default AddFeatureForm;
