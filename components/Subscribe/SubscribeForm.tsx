import Btn from "../Button/Btn";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import SingleTextField from "../SingleTextField/SingleTextField";
import { useEmailForm } from "../Forms/CallToActionHook";
import Text from "../Typography/Text";

interface Iprops {
    title: string;
    titleVariant: string;
    desc: string;
    descVariant: string;
}

const SubscribeForm: React.FC<Iprops> = ({ title, titleVariant, desc, descVariant }) => {
    const router = useRouter();
    const helperText = 'Participation is 100% optional';
    const mediumSizeOrHigher = useMediaQuery("(min-width:768px)");
    const [email, data, handleEmail, emailLabel, handleSubmit, error] =
        useEmailForm();

    const sendEmailToDb = async (emailAddress: string) => {
        const data = await fetch('api/subscribe', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailAddress })
        });
        return data;
    }

    const handleClose = () => router.push("/");

    useEffect(() => {
        email != "" && sendEmailToDb(email);
    }, [email]);

    return (
        <>
            <Text variant={titleVariant}>{title}</Text>
            <Text variant={descVariant}>{desc}</Text>
            <Box
                component="form"
                minWidth={mediumSizeOrHigher ? '100vh' : '50vh'}
            >
                <SingleTextField
                    error={error}
                    label={emailLabel}
                    value={data}
                    handleEmail={handleEmail}
                    helperText={helperText}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '20vh',
            }}>
                <Btn onClick={handleSubmit}>Submit</Btn>
                <Btn onClick={handleClose}>Cancel</Btn>
            </Box>
        </>
    );
};

export default SubscribeForm;