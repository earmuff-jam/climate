
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    Typography
} from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const textSubmitSx = {
    marginTop: 2,
}

const SubscribeForm = () => {

    const router = useRouter();
    const [error, seterror] = useState<boolean>(false);
    const [emailval, setemailval] = useState<string>("");
    const [lastname, setlastname] = useState<string>("");
    const [firstname, setfirstname] = useState<string>("");
    const [emailaddress, setemailaddress] = useState<string>("");

    const handlefirstname = (val: string) => setfirstname(val);
    const handlelastname = (val: string) => setlastname(val);
    const handleemailval = (val: string): void => setemailval(val);

    const handlesubmit = (e: React.MouseEvent): void => {
        e.preventDefault();
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (emailReg.test(emailval)) {
            setemailaddress(emailval);
            router.push("/");
            seterror(false);
            setemailval("");
            return;
        }
        seterror(true);
        setemailaddress("");
        return;

    };

    const sendEmailToDb = async (
        emailaddress: string,
        firstname: string,
        lastname: string,
    ) => {
        const data = await fetch('api/subscribe', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailaddress, firstname, lastname })
        });
        return data;
    }

    useEffect(() => {
        emailaddress != "" && sendEmailToDb(emailaddress, firstname, lastname);
    }, [emailaddress]);

    return (
        <>
            <Typography
                variant="h4"
                color={'secondary.main'}
            >
                Join the mailing list
            </Typography>
            <Typography
                variant="body2"
            >
                Sign up now and recieve exclusive content on climate application
            </Typography>

            <FormControl
                fullWidth
                error={error}
                variant="standard">
                <InputLabel
                    htmlFor="component-helper"
                >
                    Enter your email address
                </InputLabel>
                <Input
                    id="component-helper"
                    value={emailval}
                    onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                            ev.preventDefault();
                        }
                        // ev.target.value -> results an error atm
                        // although i could ev.target.value in dev console
                        // this prevents onKeyDown to submit. accessibility issue ?
                    }}
                    onChange={(e) => handleemailval(e.target.value)}
                    aria-describedby="component-helper-text"
                />
            </FormControl>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}
            >
                <FormControl
                    fullWidth
                    variant="standard">
                    <InputLabel
                        htmlFor="component-helper"
                    >
                        Enter your first name
                    </InputLabel>
                    <Input
                        id="component-helper"
                        value={firstname}
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
                                handlefirstname(e.target.value);
                            }
                        }}
                        aria-describedby="component-helper-text"
                    />
                </FormControl>

                <FormControl
                    fullWidth
                    variant="standard">
                    <InputLabel
                        htmlFor="component-helper"
                    >
                        Enter your last name
                    </InputLabel>
                    <Input
                        id="component-helper"
                        value={lastname}
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
                                handlelastname(e.target.value);
                            }
                        }}
                        aria-describedby="component-helper-text"
                    />
                </FormControl>
            </Box>
            <Box sx={textSubmitSx}>
                <Button
                    color="secondary"
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                    endIcon={<SendRoundedIcon />}
                    onClick={(e) => handlesubmit(e)}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default SubscribeForm;
