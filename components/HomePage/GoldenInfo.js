
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
    useTheme,
} from "@mui/material/styles";

import {
    Box,
    Skeleton,
    Slider,
    Tooltip,
} from '@mui/material';

import moment from 'moment';
import styles from "../../styles/Spooky.module.css";

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { TypographyStyled } from './TypographyStyled';
import ShareLocationRoundedIcon from '@mui/icons-material/ShareLocationRounded';

const golderInfoSx = (theme) => ({
    maxHeight: theme.spacing(12),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

});

const goldenInfoItemSx = (theme, index) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    p: theme.spacing(1.2),
    fontSize: theme.spacing(1.2),
    borderRight: `${theme.spacing(0.1)} solid ${theme.palette.secondary.main}`,
    borderLeft: `${theme.spacing(0.1)} solid ${theme.palette.secondary.main}`,
    flexGrow: `${0.6}`
});


const SpookySkeleton = () => {

    return (
        <Skeleton className={styles.container} />
    );
};


const GoldenInfo = () => {

    const theme = useTheme();
    const supabaseClient = useSupabaseClient();
    const ALLOWED_CONDITIONS = ['good', 'revisit', 'throwaway'];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayEmptyRenderer, setDisplayEmptyRenderer] = useState(false);

    const formatItemData = (response) => {
        const data = {
            id: response.id,
            title: response.item_name,
            total: response.quantity,
            lastMoved: response.item_name,
            expiresWithin: moment(response.use_by_date).fromNow(),
            condition: 'good',
            sharing: (response.sharable_groups?.length > 1),
            expiryItemsCount: response.quantity,
            displayStatus: (condition) => {
                return (
                    <ShareLocationRoundedIcon
                        color={`${condition === ALLOWED_CONDITIONS[1] ? 'error' : 'info'}`}
                        sx={{ fontSize: theme.spacing(2) }
                        } />
                )
            },
        };
        setLoading(false);
        setData((prev) => [...prev, data]);
    };

    const formatCategoryData = (response) => {
        const data = {
            id: response.id,
            title: response.category_name,
            lastMoved: response.category_name,
            lastCreated: moment(response.created_on).fromNow(),
            sharing: (response.contains_sharable_items),
            condition: 'revisit',
            displayStatus: (condition) => {
                return (
                    <ShareLocationRoundedIcon
                        color={`${condition === ALLOWED_CONDITIONS[1] ? 'error' : 'info'}`}
                        sx={{ fontSize: theme.spacing(2) }
                        } />
                )
            },
        };
        setLoading(false);
        setData((prev) => [...prev, data]);
    };

    const loadItemData = async () => {
        const { data: itemResp, error: itemErr } = await supabaseClient
            .from('item')
            .select().order('created_on', { ascending: false }).limit(1);
        if (itemErr || itemResp.length === 0) {
            setLoading(false);
            setDisplayEmptyRenderer(true);
            return null;
        }
        else {
            formatItemData(itemResp.find(Boolean));
        };

    };

    const fetchItemData = useCallback(() => {
        loadItemData();
    }, [data]);

    const loadCategoryData = async () => {
        const { data: catResp, error: catErr } = await supabaseClient
            .from('category')
            .select().order('created_on', { ascending: false }).limit(1);
        if (catErr || catResp.length === 0) {
            setLoading(false);
            setDisplayEmptyRenderer(true);
            return null;
        }
        else {
            formatCategoryData(catResp.find(Boolean));
        };
    };

    const fetchCategoryData = useCallback(() => {
        loadCategoryData();
    }, [data]);

    useEffect(() => {
        fetchItemData();
        fetchCategoryData();
    }, []);

    console.log(data);
    return (
        <Box
            sx={golderInfoSx}
        >
            {loading && <SpookySkeleton />}
            {!loading && displayEmptyRenderer && <TypographyStyled>
                Sorry no matching components found.</TypographyStyled>}
            {
                !loading && !displayEmptyRenderer && data?.map((dv, index) => (
                    <Box
                        key={index}
                        sx={goldenInfoItemSx(theme, index)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: theme.spacing(0.5),
                            }}
                        >
                            <Tooltip
                                title=
                                {`${dv.sharing ? 'Currently sharing' : 'Not Sharing '}`}
                            >
                                {dv.displayStatus(dv.condition)}
                            </Tooltip>

                            <TypographyStyled
                                weight={900}
                            >
                                {dv.title}
                            </TypographyStyled>
                        </Box>
                        <TypographyStyled>
                            {
                                dv?.total &&
                                `${dv.total} Items`
                            }
                            {
                                !(dv?.total) &&
                                `1 Item`
                            }
                        </TypographyStyled>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <TypographyStyled>
                                {
                                    dv?.expiresWithin &&
                                    `Use ${dv.expiresWithin}`
                                }
                                {
                                    !(dv?.expiresWithin) &&
                                    `Created ${dv.lastCreated}`
                                }
                            </TypographyStyled>
                            <TypographyStyled>
                                Last moved - {dv.lastMoved}
                            </TypographyStyled>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
};

export default GoldenInfo;

// const goldenHourData = [
//     {
//         id: 1,
//         title: 'Item',
//         total: 1,
//         lastMoved: 'Cheesecake',
//         timeMoved: moment().fromNow(),
//         condition: 'good',
//         sharing: false,
//         expiryItemsCount: 12, // in %
//         displayStatus: (condition) => {
//             return (
//                 <ShareLocationRoundedIcon
//                     color={`${condition === ALLOWED_CONDITIONS[1] ? 'error' : 'info'}`}
//                     sx={{ fontSize: theme.spacing(2) }
//                     } />
//             )
//         },
//     },
//     {
//         id: 1,
//         title: 'Category',
//         total: 11,
//         lastMoved: 'Garage',
//         timeMoved: moment('2020/12/20').fromNow(),
//         condition: 'revisit',
//         sharing: true,
//         expiryItemsCount: 66,
//         displayStatus: (condition) => {
//             return (
//                 <ShareLocationRoundedIcon
//                     color={`${condition === ALLOWED_CONDITIONS[1] ? 'error' : 'info'}`}
//                     sx={{ fontSize: theme.spacing(2) }} />
//             )
//         },
//     },
//     {
//         id: 1,
//         title: 'Junk',
//         total: 12,
//         lastMoved: 'Junk Drawer',
//         timeMoved: moment('2020/12/20').fromNow(),
//         condition: 'throwaway',
//         sharing: true,
//         expiryItemsCount: 23,
//         displayStatus: (condition) => {
//             return (
//                 <ShareLocationRoundedIcon
//                     color={`${condition === ALLOWED_CONDITIONS[1] ? 'error' : 'info'}`}
//                     sx={{ fontSize: theme.spacing(2) }} />
//             )
//         },
//     },

//     // 'All generic details about item',
//     // 'All generic details about category',
//     // 'All generic details about other stuffs',
// ];