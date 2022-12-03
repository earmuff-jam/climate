import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useMediaQuery } from "@mui/material";
import { useEmailForm } from "./CallToActionHook";

const EmailForm: React.FC = () => {
  const mediumSizeOrHigher = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const [email, data, handleEmail, emailLabel, handleSubmit, error] =
    useEmailForm();

  const sendEmailToDb = async (emailAddress: string) => {
    console.log(emailAddress);
    const data = await fetch('api/subscribe', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailAddress })
    });
    return data;
  }

  useEffect(() => {
    email != "" && sendEmailToDb(email);
  }, [email]);

  return (
    <>
      <Box component="form" minWidth={mediumSizeOrHigher ? '100vh' : '50vh'}>
        <FormControl fullWidth error={error} variant="standard">
          <InputLabel htmlFor="component-helper">{emailLabel}</InputLabel>
          <Input
            id="component-helper"
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
                handleEmail(e.target.value);
              }
            }}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Participation is 100 % free and voluntary.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20vh' }}>
        <Button variant="text" onClick={(e) => handleSubmit(e)}>
          {" "}
          Submit{" "}
        </Button>
        <Button variant="text" onClick={() => router.push("/")}>
          {" "}
          Cancel{" "}
        </Button>
      </Box>
    </>
  );
};
export default EmailForm;