import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from 'next/image';
import WebStoriesIcon from "@mui/icons-material/WebStories";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MailIcon from "@mui/icons-material/Mail";
import SourceIcon from "@mui/icons-material/Source";
import { useRouter } from 'next/router';

const pages = [
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
        title: "Stuff",
        link: "/stuff",
        icon: <SourceIcon />,
        isSelected: (val: string): boolean => val === "/stuff",
    },
    {
        title: "Feedback",
        link: "/feedback",
        icon: <FeedbackRoundedIcon />,
        isSelected: (val: string): boolean => val === "/feedback",
    }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const MainMenu = () => {

    const router = useRouter();
    const supabase = useSupabaseClient();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = async () => {

        setAnchorElUser(null);
        await supabase.auth.signOut();
    };

    const displayLogo = () => {
        return (
            <Image
                src={'/logo.svg'}
                alt="company logo. a shopping cart with red paint"
                width={42}
                height={42}
            />
        )
    };

    return (
        <AppBar
            position="static"
            color="primary"
        >
            <Container
                maxWidth="xl"
            >
                <Toolbar
                    disableGutters
                    variant='dense'
                >
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {displayLogo()}
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.title}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        return router.push(page.link);
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                    >
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        {displayLogo()}
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            ml: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Climate
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    return router.push(page.link);
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MainMenu;