import * as React from 'react';
import { Stack } from '@mui/system';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Link from "next/link";
import { Typography } from '@mui/material';
import ListItem from "@mui/material/ListItem";

import MailIcon from "@mui/icons-material/Mail";
import SourceIcon from "@mui/icons-material/Source";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';

const currentRoutes = [
    {
        title: "Home",
        link: "/",
        icon: <WebStoriesIcon />,
        isSelected: (val: string): boolean => val === "/",
    },
    {
        title: "Subscribe",
        link: "/subscribe",
        icon: <MailIcon />,
        isSelected: (val: string): boolean => val === "/subscribe",
    },
    {
        title: "Category",
        link: "/category",
        icon: <SourceIcon />,
        isSelected: (val: string): boolean => val === "/category",
    },
    {
        title: "Feedback",
        link: "/feedback",
        icon: <FeedbackRoundedIcon />,
        isSelected: (val: string): boolean => val === "/feedback",
    }
];

const NavMenuBar = () => {

    const supabase = useSupabaseClient();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                color='secondary'
            >
                <Toolbar
                    variant="dense"
                >
                    <Stack
                        direction="row"
                        gap={1}
                        sx={{ flexGrow: 1 }}
                    >
                        {currentRoutes.map((route, index) => {
                            return (
                                <ListItem
                                    key={route.title}
                                    dense
                                    disablePadding
                                    disableGutters
                                >
                                    <Link href={route.link}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <IconButton
                                                size="small"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{ mr: 2 }}
                                            >
                                                {route.icon}
                                            </IconButton>
                                            <Typography>
                                                {route.title}
                                            </Typography>
                                        </Stack>
                                    </Link>
                                </ListItem>
                            );
                        })}

                    </Stack>

                    <Button
                        onClick={async () => {
                            await supabase.auth.signOut();
                        }}
                        color="inherit"
                    >
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavMenuBar;