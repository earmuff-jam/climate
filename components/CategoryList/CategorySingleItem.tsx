import CategoryToolbar from '../CategoryToolbar/CategoryToolbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Chip } from "@mui/material";
import Box from '@mui/material/Box';
import Image from "next/image";
import React from "react";

interface Iprops {
    title?: string;
    tags?: { id: number; tag: string; }[];
    expiresAt?: string;
    note?: string;
    imageSx?: any;
}

const CategorySingleItem = (props: Iprops) => {

    const cardContentSx = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 2,
    };

    const cardHeaderContentSx = {
        display: 'flex',
        flexDirection: 'column',
    };

    const tagsSx = {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
    }

    const { title, tags, expiresAt, note, imageSx } = props;

    return (
        <Card sx={{ display: 'flex' }}>
            <CardContent>
                <Box sx={cardContentSx}>
                    <Image {...imageSx} />
                    <Box sx={cardHeaderContentSx}>
                        <Typography variant="caption" component="div">
                            {title}
                        </Typography>
                        <Box sx={tagsSx}>
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
                    </Box>
                    <CategoryToolbar note={note}/>
                </Box>
            </CardContent>
            <CardActions>
                <Typography
                    variant="caption"
                >
                    {expiresAt}
                </Typography>
            </CardActions>
        </Card>
    )
};

export default CategorySingleItem;