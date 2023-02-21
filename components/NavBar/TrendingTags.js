
import React, { useState } from 'react';

import {
    List,
    ListItemText,
    ListSubheader,
    ListItemButton,
    ListItem,
    Tooltip,
    Paper,
    Icon,
} from '@mui/material';

import { TRENDING_TAG_OPTIONS } from './constant';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

const containerStylesSx = (theme) => ({
    marginTop: theme.spacing(2),
    border: `${theme.spacing(0.2)} solid ${theme.palette.secondary.light}`,
});

const itemStyleSx = (theme) => ({
    gap: theme.spacing(1),
});

const TrendingTags = () => {

    const [selected, setSelected] = useState(-1);

    const handleSelected = (index) => setSelected(index);

    return (
        <List
            sx={containerStylesSx}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Trending Tags
                    <Icon sx={{ color: 'pink' }}>
                        <TrendingUpRoundedIcon />
                    </Icon>
                </ListSubheader>
            }
        >
            {
                TRENDING_TAG_OPTIONS?.map((item, i) => (
                    <>
                        <ListItem key={i}>
                            <Tooltip title={item.secondaryText}>
                                <ListItemButton
                                    selected={selected === i}
                                    onClick={() => handleSelected(i)}
                                    sx={itemStyleSx}
                                >
                                    <ListItemText>
                                        {item.primaryText}
                                    </ListItemText>
                                    <Paper sx={{ pl: 0.6, pr: 0.6 }} elevation={1}>
                                        <ListItemText>
                                            +{item.numberOfItemsWithinTag}
                                        </ListItemText>
                                    </Paper>
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    </>
                ))
            }
        </List>
    )
};

export default TrendingTags;