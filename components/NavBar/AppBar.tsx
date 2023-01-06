import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Stack } from '@mui/system';

import Link from "next/link";
import { useRouter } from "next/router";
import ListItem from "@mui/material/ListItem";
import MailIcon from "@mui/icons-material/Mail";
import SourceIcon from "@mui/icons-material/Source";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import { Typography } from '@mui/material';

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

    const { pathname } = useRouter();
    const supabase = useSupabaseClient();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                color='secondary'
            >
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
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
                                        <Typography>
                                            {route.title}
                                        </Typography>
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