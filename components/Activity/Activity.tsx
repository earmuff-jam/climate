import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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


const Activity = () => {

    const generateActivityTrail = (category: string) => {
        return sampleActivityTrail?.find(x => x.item === category)?.trail;
    }

    return (
        <>
            <Box sx={{ p: 1 }}>
                <Typography variant="caption" gutterBottom>
                    <strong>Recent Activity</strong>
                </Typography>
                <br />
                <br />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {
                        sampleActivityTrail.map((x) => {
                            return (
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2 }}>
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
                                    <Box sx={{ backgroundColor: 'secondary.dark', marginTop: 2, marginLeft: 2 }}>
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
                </Box>
            </Box>
        </>
    )
};

export default Activity;