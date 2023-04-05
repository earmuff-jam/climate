import * as React from 'react';

import {
    useTheme,
} from "@mui/material/styles";

import SearchBar from './SearchBar';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';


// import IconButton from '@mui/material/IconButton';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// import Link from "next/link";
import Logo from '../Logo/Logo';
import { IconButton } from '@mui/material';
// import styles from "./Navbar.module.css";
// import { Typography } from '@mui/material';
// import ListItem from "@mui/material/ListItem";

// import MailIcon from "@mui/icons-material/Mail";
// import SourceIcon from "@mui/icons-material/Source";
// import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';

// const currentRoutes = [
//     {
//         title: "Subscribe",
//         link: "/subscribe",
//         icon: <MailIcon />,
//         isSelected: (val: string): boolean => val === "/subscribe",
//     },
//     {
//         title: "Category",
//         link: "/category",
//         icon: <SourceIcon />,
//         isSelected: (val: string): boolean => val === "/category",
//     },
//     {
//         title: "Feedback",
//         link: "/feedback",
//         icon: <FeedbackRoundedIcon />,
//         isSelected: (val: string): boolean => val === "/feedback",
//     }
// ];

const containerStylesSx = (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
});

const NavMenuBar = () => {

    const theme = useTheme();
    const supabase = useSupabaseClient();

    const signOff = async () => {
        await supabase.auth.signOut();
    };

    return (
        <Box>
            <AppBar
                elevation={2}
                position="static"
            >
                <Toolbar
                    variant="dense"
                    sx={containerStylesSx(theme)}
                >
                    <Logo />
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <SearchBar />
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton onClick={signOff}>
                        <LogoutRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavMenuBar;