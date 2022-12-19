import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';


interface Iprops {
    note?: string;
    displayTooltipTitle: string;
    badgeContentAttachFileSx: number;
}


const CategoryToolbar = (props: Iprops) => {

    const { note, displayTooltipTitle, badgeContentAttachFileSx } = props;

    return (
        <Box>
            <Toolbar>
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexGrow: 1, gap: 2, }}>
                    <IconButton size="small" aria-label="attach-file" color="inherit">
                        <Tooltip title={displayTooltipTitle}>
                            <PriorityHighRoundedIcon color='warning' />
                        </Tooltip>
                    </IconButton>
                    <Typography variant="caption" sx={{ alignSelf: 'center' }}> {note} </Typography>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap: 2 }}>
                    <IconButton size="small" aria-label="attach-file" color="inherit">
                        <Tooltip title={'Attach file'}>
                            <Badge badgeContent={badgeContentAttachFileSx} color="error">
                                <AttachFileRoundedIcon />
                            </Badge>
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="monitor item"
                        color="inherit"
                    >
                        <Tooltip title={'monitor item'}>
                            <LocationSearchingRoundedIcon />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Toolbar>
        </Box >
    );
}
export default CategoryToolbar;