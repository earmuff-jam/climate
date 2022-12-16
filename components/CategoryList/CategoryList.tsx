import { IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import supabaseIcon from "../../public/supabaseIcon.png";
import Image from "next/image";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CategorySingleItem from "./CategorySingleItem";

const sampleActivityTrail = [
    {
        id: 1,
        item: 'Candles',
        itemStorageLoc: 'BA102',
        overallStatus: 'CREATED',
        trail: [
            {
                id: 1,
                date: '10/10/2021',
                status: 'PENDING',
                note: '',
            },
            {
                id: 2,
                date: '10/09/2021',
                status: 'MOVING',
                note: '',
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
                note: '',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
                note: '',
            },
        ]
    },
    {
        id: 2,
        item: 'Paper Towels',
        itemStorageLoc: 'BA2201',
        overallStatus: 'EMPTY',
        trail: [
            {
                id: 1,
                date: '10/10/2021',
                status: 'PENDING',
            },
            {
                id: 2,
                date: '10/09/2021',
                status: 'MOVING',
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
            },
        ]
    },
    {
        id: 3,
        item: 'Paintbrushes type 01',
        itemStorageLoc: 'PT2212',
        overallStatus: 'FULFILLED',
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
            },
            {
                id: 3,
                date: '10/06/2021',
                status: 'SAVED',
            },
            {
                id: 4,
                date: '10/03/2021',
                status: 'CREATED',
            },
        ]
    },
];

const listStylesSx = {
    width: '100%',
    // maxWidth: 360,
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

const CategoryList = () => {

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
                                                            tags={['Food', 'Pantry']}
                                                            imageSx={imageSx}
                                                        />
                                                    </>
                                                }
                                                secondary={
                                                    <>
                                                        {x.note}
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


{/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {
                        sampleActivityTrail.map((x) => {
                            return (
                                <>
                                
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography variant="caption">
                                            {x.item}
                                        </Typography>
                                        <Typography variant="caption">
                                            <strong>{x.itemStorageLoc}</strong>
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'white',
                                                fontSize: '0.7rem',
                                                padding: '0.2rem',
                                                backgroundColor: 'primary.main',
                                                borderRadius: '0.2rem',
                                            }}>
                                            {x.overallStatus}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ backgroundColor: 'secondary.dark', marginLeft: 6 }}>
                                        {generateActivityTrail(x.item)?.map((x) => {
                                            return (

                                                <Box sx={{ p: 1 }}>
                                                    <Typography variant="caption">
                                                        : {x.date} {x.status}
                                                    </Typography>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </>
                            )
                        })
                    }
                </Box> */}