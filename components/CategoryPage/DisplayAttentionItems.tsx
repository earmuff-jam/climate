
import React, { useState, useEffect } from "react";

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import BaseTable, {
    AutoResizer,
    Column,
    SortOrder,
} from 'react-base-table'
import 'react-base-table/styles.css'

import { Box, Typography } from "@mui/material";
import moment, { now } from "moment";

const columns = [
    {
        key: "item_name",
        title: "Name",
        dataKey: "item_name",
        width: 150,
        align: Column.Alignment.CENTER,
    },
    {
        key: "use_by_date",
        title: "Expires",
        dataKey: "use_by_date",
        width: 150,
        align: Column.Alignment.CENTER,
        cellRenderer: ({ cellData: use_by_date }: any) => <CategoryChoice use_by_date={use_by_date} />,
    },
];

const CategoryChoice = ({ use_by_date }: any) => {
    const diff = moment(use_by_date).diff(moment.now(), 'days');
    const duration = moment(use_by_date).fromNow();
    return (
        <Box sx={{
            pl: 1,
            borderLeft: (diff <= 10 ? '2px solid red' : diff <= 30 ? '2px solid gold' : 'none'),
        }}>{duration}</Box>
    )
};


const DisplayAttentionItems = (props: any) => {

    const { rowData } = props;
    const categoryName = rowData['category_name'];
    const supabaseClient = useSupabaseClient();
    const [datasets, setDatasets] = useState<any | null>([]);

    const fetchCategoryList = async () => {
        let { data, error } = await supabaseClient
            .rpc('fn_gather_items_by_category_use_by_date', {
                category: categoryName
            })
        if (error) return;
        setDatasets(data);
    };

    useEffect(() => {
        fetchCategoryList();
    }, [categoryName]);


    return (
        <Box style={{ width: "40vw", height: "40vh" }}>
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        columns={columns}
                        data={datasets}
                        width={width}
                        height={height}
                        // sortBy={sortBy}
                        // onColumnSort={onColumnSort}
                        emptyRenderer={() => (<Typography> Sorry, no matching records found. </Typography>)}
                    />
                )}
            </AutoResizer>
        </Box>
    )
};


export default DisplayAttentionItems;