import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

  //   const sendEmailToDb = (email: string) => {
  //     const collectionReference = collection(db, "emails");
  //     addDoc(collectionReference, {
  //       emailAddress: email,
  //       unsubscribe: false,
  //     });
  //     // getDocs(collectionReference) // retrieve all the docs
  //     //   .then((snapshot) => {
  //     //     let emails = [];
  //     //     snapshot.docs.forEach((doc) => {
  //     //       emails.push({ ...doc.data(), id: doc.id });
  //     //     });
  //     //     console.log(emails);
  //     //   })
  //     //   .catch(() => {
  //     //     console.error(" Failed .");
  //     //   });
  //   };

  const sendEmailToDb = (emailAddress: string): void => {

  }

  useEffect(() => {
    email != "" && sendEmailToDb(email);
  }, [email]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4"> Stay in the loop </Typography>
      <Typography variant="body1">Tune in for roll out date</Typography>
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
        <Button variant="contained" onClick={(e) => handleSubmit(e)}>
          {" "}
          Submit{" "}
        </Button>
        <Button variant="text" onClick={() => router.push("/")}>
          {" "}
          Cancel{" "}
        </Button>
      </Box>
    </Box>
  );
};
export default EmailForm;