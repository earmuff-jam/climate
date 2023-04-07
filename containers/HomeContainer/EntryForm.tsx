import {
    Grid,
    Typography,
} from '@mui/material';

import {
    useTheme,
} from "@mui/material/styles";

import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/system';
import { Auth } from '@supabase/auth-ui-react';

interface Iprops {
    supabase?: any;
    redirectUri?: string;
}

const gridStylesSx = (theme: any) => {
    return {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
    };
};

const headerTextSx = {
    fontSize: '2.5rem',
    textAlign: 'center',
};

const captionTextSx = {
    fontSize: '0.8rem',
    textAlign: 'center',
};

const loginStyleSx = (theme: any) => {
    return {
        button: {
            backgroundColor: theme.palette,
            color: theme.palette.secondary.main,
            padding: theme.spacing(2),
        },
        anchor: {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            fontSize: '1.2rem',
            lineHeight: '1.6',
        },
        input: {
            border: 0,
            borderBottom: `${theme.spacing(0.1)} solid ${theme.palette.secondary.main}`,
            color: theme.palette.secondary.main,
            padding: theme.spacing(2),
        },
        message: {
            color: theme.palette.error.main,
        },
    }
};

const imageSx = { display: 'flex', justifyContent: 'center' };

const loginFormSx = (theme: any) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: theme.spacing(60),
});

const hideImgMobileSx = (theme: any) => ({
    xs: 'none',
    lg: 'block',
});

export const headerText = 'Welcome to PropertyCo';
export const captionText = 'Toolkit for Property and Inventory Management';


const EntryForm = ({ supabase, redirectUri }: Iprops) => {

    const theme = useTheme();
    return (
        <Grid
            container
            sx={gridStylesSx}
        >
            <Grid
                item
                md={6}
                lg={6}
                display={hideImgMobileSx}
            >
                <Box sx={imageSx}>
                    <Image
                        alt="image"
                        src={"/bird.jpeg"}
                        width={450}
                        height={450}
                        style={{
                            position: "relative",
                            objectFit: "cover",
                            borderRadius: 8,
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Box sx={loginFormSx}>
                    <Typography
                        sx={headerTextSx}
                    >
                        {headerText}
                    </Typography>
                    <Typography sx={captionTextSx}>{captionText}</Typography>
                    <Auth
                        supabaseClient={supabase}
                        redirectTo={redirectUri}
                        appearance={{
                            style: loginStyleSx(theme),
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    )
};

export default EntryForm;