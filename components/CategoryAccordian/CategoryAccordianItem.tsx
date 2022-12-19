import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import CategoryToolbar from '../CategoryToolbar/CategoryToolbar';


interface Iprops {
    title?: string;
    itemLoc?: string;
    tags?: { id: number; tag: string; }[];
    expiresAt?: string;
    note?: string;
    imgSrc?: any;
    tagSx?: { display: string; flexDirection: string; gap?: number };
    imgSx: { id: string, width: number, height: number, alt: string };

}

const CategoryAccordianItem = (props: Iprops) => {


    const attachmentCount = 0;
    const { title, tags, itemLoc, note, tagSx } = props;


    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {itemLoc}
                </Typography>
                <Box sx={tagSx}>
                    {
                        tags?.map(tag => (
                            <Chip
                                key={tag.id}
                                label={tag.tag}
                                size={'small'}
                            />
                        ))
                    }
                </Box>
                <CategoryToolbar note={note} displayTooltipTitle={'warning of the item'} badgeContentAttachFileSx={attachmentCount} />
            </AccordionDetails>
        </Accordion>
    );
}

export default CategoryAccordianItem;