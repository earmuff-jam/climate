import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';


interface Iprops {
    note?: string;
}


const CategoryToolbar = (props: Iprops) => {

    const { note } = props;

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="small" aria-label="attach-file" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <AttachFileRoundedIcon />
                    </Badge>
                </IconButton>
                <p>Attach file</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="small"
                    aria-label="move to favourites"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <FavoriteBorderRoundedIcon />
                    </Badge>
                </IconButton>
                <p>Make favourite</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box>
            <Toolbar>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2, }}>
                    <IconButton size="small" aria-label="attach-file" color="inherit">
                        <Tooltip title={'Attach file'}>
                            <PriorityHighRoundedIcon color='warning' />
                        </Tooltip>
                    </IconButton>
                    <Typography variant="caption" sx={{ alignSelf: 'center' }}> {note} </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <IconButton size="small" aria-label="attach-file" color="inherit">
                        <Tooltip title={'Attach file'}>
                            <Badge badgeContent={4} color="error">
                                <AttachFileRoundedIcon />
                            </Badge>
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="move to favourites"
                        color="inherit"
                    >
                        <Tooltip title={'Move to favourites'}>
                            <Badge badgeContent={17} color="error">
                                <FavoriteBorderRoundedIcon />
                            </Badge>
                        </Tooltip>
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            {renderMobileMenu}
        </Box >
    );
}
export default CategoryToolbar;