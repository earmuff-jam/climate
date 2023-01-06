
import React, {
    useState,
    useEffect,
} from "react";


import BaseTable, {
    AutoResizer,
    Column,
} from 'react-base-table'
import 'react-base-table/styles.css'

import {
    useUser,
    useSession,
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { Box } from "@mui/system";
import { Chip } from "@mui/material";

const Category = () => {

    const user = useUser();
    const session = useSession(); // user values are here too
    const supabaseClient = useSupabaseClient();

    const DisplayTag = (props: any) => {
        const { tags } = props;
        return (
            <>
                {
                    tags?.map((el: any) => (
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
            dataKey: "category_type",
            width: 300,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: "cat_name",
            title: "Category Name",
            dataKey: "category_name",
            width: 300,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: "cat_desc",
            title: "Category Description",
            dataKey: "category_description",
            width: 600,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT
        },
        // {
        //     key: "cat_tag",
        //     title: "Category Tags",
        //     dataKey: "category_tag",
        //     width: 250,
        //     resizable: true,
        //     sortable: true,
        //     editable: true,
        //     cellRenderer: ({ cellData: tags }: {tags: any}) => <DisplayTag tags={tags} 
        //     />
        // },
        {
            key: "created_on",
            title: "Last updated Date",
            dataKey: "created_on",
            width: 400,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.RIGHT
        },
    ];

    const [datasets, setDatasets] = useState<any | null>([]);

    const fetchCategoryList = async () => {
        const { data, error } = await supabaseClient.from('category')
            .select(`
        category_type,
        category_name,
        category_description,
        created_on,
        created_by,
        contains_sharable_items,
        category_tag(id, tag_name)
        `);
        if (error) return;
        setDatasets(data);
    }

    useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <Box style={{ width: "100vw", height: "100vh" }}>
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
        </Box>

    )
};

export default Category;