import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    LinearProgress,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import CategorySingleItem from "./CategorySingleItem";
import supabaseIcon from "../../public/supabaseIcon.png";

const sampleActivityTrail = [
    {
        id: 1,
        item: 'Candles',
        itemStorageLoc: 'BA102',
        overallStatus: 'CREATED',
        tagList: [
            { id: 1, tag: 'Food' },
            { id: 2, tag: 'pantry' }
        ],
        trail: [
            {
                id: 1,
                date: '10/10/2021',
                status: 'PENDING',
                note: 'Should buy new items',
            },
            {
                id: 2,
                date: '10/09/2021',
                status: 'MOVING',
                note: 'Could not find it when i needed to ?',
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
                note: 'Rotten',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
                note: 'All sold or given away.',
            },
        ]
    },
    {
        id: 2,
        item: 'Paper Towels',
        itemStorageLoc: 'BA2201',
        overallStatus: 'EMPTY',
        tagList: [
            { id: 1, tag: 'Food' },
            { id: 2, tag: 'pantry' }
        ],
        trail: [
            {
                id: 1,
                date: '10/10/2021',
                status: 'PENDING',
                note: 'Should buy new items',
            },
            {
                id: 2,
                date: '10/09/2021',
                status: 'MOVING',
                note: 'Should buy new items',
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
                note: 'Should buy new items',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
                note: 'Should buy new items',
            },
        ]
    },
    {
        id: 3,
        item: 'Paintbrushes type 01',
        itemStorageLoc: 'PT2212',
        overallStatus: 'FULFILLED',
        tagList: [
            { id: 1, tag: 'Garage' },
            { id: 2, tag: 'cleaning' },
            { id: 3, tag: 'storage' },
        ],
        trail: [
            {
                id: 1,
                date: '10/10/2021',
                status: 'FULLFILLED',
                note: 'do not buy new items',
            },
            {
                id: 2,
                date: '10/09/2021',
                status: 'MOVING',
                notes: '',
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
                notes: '',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
                notes: '',
            },
        ]
    },
];

const listStylesSx = {
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 768,
    '& ul': { padding: 0 },
};

const primaryTypographyPropsSx: any = {
    color: 'primary',
    fontWeight: 'medium',
    variant: 'body2',
};

interface ImageSxProps {
    id: number;
    width: number;
    height: number;
    src: any;
    alt: string;
}

interface Iprops {

}

const CategoryList = (props: Iprops) => {

    const generateActivityTrail = (category: string) => {
        return sampleActivityTrail?.find(x => x.item === category)?.trail;
    }

    const imageSx: ImageSxProps = {
        id: 1,
        width: 30,
        height: 30,
        src: supabaseIcon,
        alt: "supabase icon that leads to supabase page"
    };

    return (
        <>
            <Box sx={{ p: 1 }}>
                <LinearProgress variant="determinate" value={20} color={"secondary"} />
                <List
                    sx={listStylesSx}
                    subheader={<li />}
                >
                    {sampleActivityTrail.map((trail) => (
                        <li key={`section-${trail.id}`}>
                            <ul>
                                <ListSubheader>{`${trail.item}`}
                                </ListSubheader>
                                {
                                    generateActivityTrail(trail.item)?.map((x) => (
                                        <ListItem
                                            key={`item-${trail.item}-${x.id}`}>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        <CategorySingleItem title={x.status}
                                                            key={0}
                                                            expiresAt={x.date}
                                                            tags={trail.tagList}
                                                            note={x.note}
                                                            imageSx={imageSx}
                                                        />
                                                    </>
                                                }
                                                primaryTypographyProps={primaryTypographyPropsSx}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </ul>
                        </li>
                    ))}
                </List>
            </Box>
        </>
    )
};

export default CategoryList;