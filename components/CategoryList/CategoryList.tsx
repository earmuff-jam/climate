import React, { useEffect, useState } from "react";
import { supabase } from "../../utility/supabaseClient";
import supabaseIcon from "../../public/supabaseIcon.png";
import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'
import { Chip, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";

// const sampleActivityTrail = [
//     {
//         id: 1,
//         item: 'Candles',
//         itemStorageLoc: 'BA102',
//         contains_expired_items: 'CREATED',
//         tagList: [
//             { id: 1, tag: 'Food' },
//             { id: 2, tag: 'pantry' }
//         ],
//         trail: [
//             {
//                 id: 1,
//                 date: '10/10/2021',
//                 status: 'PENDING',
//                 note: 'Should buy new items',
//             },
//             {
//                 id: 2,
//                 date: '10/09/2021',
//                 status: 'MOVING',
//                 note: 'Could not find it when i needed to ?',
//             },
//             {
//                 id: 3,
//                 date: '10/06/2021',
//                 status: 'SAVED',
//                 note: 'Rotten',
//             },
//             {
//                 id: 4,
//                 date: '10/03/2021',
//                 status: 'CREATED',
//                 note: 'All sold or given away.',
//             },
//         ]
//     },
//     {
//         id: 2,
//         item: 'Paper Towels',
//         itemStorageLoc: 'BA2201',
//         overallStatus: 'EMPTY',
//         tagList: [
//             { id: 1, tag: 'Food' },
//             { id: 2, tag: 'pantry' }
//         ],
//         trail: [
//             {
//                 id: 1,
//                 date: '10/10/2021',
//                 status: 'PENDING',
//                 note: 'Should buy new items',
//             },
//             {
//                 id: 2,
//                 date: '10/09/2021',
//                 status: 'MOVING',
//                 note: 'Should buy new items',
//             },
//             {
//                 id: 3,
//                 date: '10/06/2021',
//                 status: 'SAVED',
//                 note: 'Should buy new items',
//             },
//             {
//                 id: 4,
//                 date: '10/03/2021',
//                 status: 'CREATED',
//                 note: 'Should buy new items',
//             },
//         ]
//     },
//     {
//         id: 3,
//         item: 'Paintbrushes type 01',
//         itemStorageLoc: 'PT2212',
//         overallStatus: 'FULFILLED',
//         tagList: [
//             { id: 1, tag: 'Garage' },
//             { id: 2, tag: 'cleaning' },
//             { id: 3, tag: 'storage' },
//         ],
//         trail: [
//             {
//                 id: 1,
//                 date: '10/10/2021',
//                 status: 'FULLFILLED',
//                 note: 'do not buy new items',
//             },
//             {
//                 id: 2,
//                 date: '10/09/2021',
//                 status: 'MOVING',
//                 notes: '',
//             },
//             {
//                 id: 3,
//                 date: '10/06/2021',
//                 status: 'SAVED',
//                 notes: '',
//             },
//             {
//                 id: 4,
//                 date: '10/03/2021',
//                 status: 'CREATED',
//                 notes: '',
//             },
//         ]
//     },
// ];

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

const tagsSx = {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
}

interface Iprops {

}

const DisplayTag = (props: any) => {
    const { tags } = props;
    return (
        <>
            {
                tags?.map((el) => (
                    <Chip key={el.id} label={el.item_name}>
                        {el.item_name}
                    </Chip>
                ))
            }
        </>
    )
};

const columns = [
    {
        key: "id",
        title: "Category Id",
        dataKey: "id",
        width: 200,
        resizable: true,
        sortable: true,
        editable: true,
        frozen: Column.FrozenDirection.LEFT
    },
    {
        key: "cat_type",
        title: "Category Type",
        dataKey: "cat_type",
        width: 300,
        resizable: true,
        sortable: true,
        editable: true,
        frozen: Column.FrozenDirection.LEFT
    },
    {
        key: "cat_name",
        title: "Category Name",
        dataKey: "cat_name",
        width: 300,
        resizable: true,
        sortable: true,
        editable: true,
        frozen: Column.FrozenDirection.LEFT
    },
    {
        key: "cat_tag",
        title: "Category Tags",
        dataKey: "category_tag",
        width: 450,
        resizable: true,
        sortable: true,
        editable: true,
        cellRenderer: ({ cellData: tags }) => <DisplayTag tags={tags} />
    },
    {
        key: "created_on",
        title: "Last updated Date",
        dataKey: "created_on",
        width: 300,
        resizable: true,
        sortable: true,
        editable: true,
        frozen: Column.FrozenDirection.RIGHT
    },
];



const CategoryList = (props: Iprops) => {

    const [datasets, setDatasets] = useState<any | null>([]);

    const fetchCategoryList = async () => {
        const { data, error } = await supabase.from('item_category')
            .select(`
        cat_type,
        cat_name,
        cat_description,
        created_on,
        id,
        category_tag:id( * )
        `);
        console.log(data, error);
        if (error) return;
        else { setDatasets(data) };
    }

    useEffect(() => {
        fetchCategoryList();
    }, []);

    const imgSrc = supabaseIcon;
    const imgSx: any = {
        id: 1,
        width: 30,
        height: 30,
        alt: "supabase icon that leads to supabase page"
    };

    return (
        <div style={{ width: "90vw", height: "90vh" }}>
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        columns={columns}
                        data={datasets}
                        width={width}
                        height={height}
                    />
                )}
            </AutoResizer>
        </div>

    )
};

export default CategoryList;