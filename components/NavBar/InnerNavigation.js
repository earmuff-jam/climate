
import * as React from 'react';
import TrendingTags from './TrendingTags';

import {
    List,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Divider,
    ListItem,
    Tooltip,
} from '@mui/material';

import { NAV_BAR_OPTIONS } from './constant';

const containerStylesSx = (theme) => ({
    border: `${theme.spacing(0.2)} solid ${theme.palette.secondary.light}`,
});

const itemStyleSx = (theme) => ({
    gap: theme.spacing(1),
});


const InnerNavigation = (props) => {

    const {
        selected,
        handleSelected,
    } = props;

    const options = NAV_BAR_OPTIONS;

    return (
        <>
            <List
                sx={containerStylesSx}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Inventory Quick View
                    </ListSubheader>
                }
            >
                {
                    options?.map((item, i) => (
                        <>
                            <ListItem key={i}>
                                <Tooltip title={item.secondaryText}>
                                    <ListItemButton
                                        selected={selected === i}
                                        onClick={() => handleSelected(i)}
                                        sx={itemStyleSx}
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
            </List>
            <Divider />
            <TrendingTags />
        </>
    );
};

export default InnerNavigation;