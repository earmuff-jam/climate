import React from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

interface Iprops {
    title: string;
    appBarSx: any,
}

const titleStylesSx = { flexGrow: 1 };

const CategoryBar = (props: Iprops) => {

    const { title, appBarSx } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={appBarSx}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <FavoriteBorderRoundedIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={titleStylesSx}
                    >
                        {title}
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <AddCircleRoundedIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <CloudDownloadRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )

};

export default CategoryBar;

