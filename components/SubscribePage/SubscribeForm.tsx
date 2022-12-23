import Btn from "../Button/Btn";
import Box from "@mui/material/Box";
import Text from "../Typography/Text";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useEmailForm } from "../Forms/CallToActionHook";
import SingleTextField from "../SingleTextField/SingleTextField";

interface Iprops {
    title: string;
    titleVariant: string;
    desc: string;
    descVariant: string;
}

const SubscribeForm: React.FC<Iprops> = ({
    title,
    titleVariant,
    desc,
    descVariant
}) => {
    const router = useRouter();
    const helperText = 'Participation is 100% optional';
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


    useEffect(() => {
        email != "" && sendEmailToDb(email);
    }, [email]);

    return (
        <>
            <Text variant={titleVariant}>{title}</Text>
            <Text variant={descVariant}>{desc}</Text>
            <Box
                component="form"
            >
                <SingleTextField
                    error={error}
                    label={emailLabel}
                    value={data}
                    handleEmail={handleEmail}
                    helperText={helperText}
                />
            </Box>
            <Btn onClick={handleSubmit} label="submit" />
        </>
    );
};

export default SubscribeForm;