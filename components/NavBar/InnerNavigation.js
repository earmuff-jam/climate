import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ListItem, Tooltip, Typography } from '@mui/material';

const containerStylesSx = (theme) => ({
    border: `${theme.spacing(0.2)} solid ${theme.palette.secondary.light}`,
});

const itemStyleSx = (theme) => ({
    gap: theme.spacing(1),
});


export default function InnerNavigation() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const options = [
        {
            id: 1,
            icon: <SendIcon />,
            primaryText: 'All Categories',
            secondaryText: 'Display all categories',
        },
        {
            id: 2,
            icon: <DraftsIcon />,
            primaryText: 'All Items',
            secondaryText: 'Display all items',
        },
        {
            id: 3,
            icon: <InboxIcon />,
            primaryText: 'Currently sharing',
            secondaryText: 'Display all sharing items',
        },
        {
            id: 4,
            icon: <InboxIcon />,
            primaryText: 'Lost and found',
            secondaryText: 'Display all items that need attention',
        },
    ]

    return (
        <List
            sx={containerStylesSx}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Items Quick View
                </ListSubheader>
            }
        >
            {
                options?.map(item => (
                    <>
                        <ListItem>
                            <Tooltip title={item.secondaryText}>
                                <ListItemButton
                                    sx={itemStyleSx}
                                    onClick={item.handleClick}
                                >
                                    {item.icon}
                                    <ListItemText>
                                        {item.primaryText}
                                    </ListItemText>
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    </>
                ))
            }

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}