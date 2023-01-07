
import React, {
    useState,
    useEffect,
} from "react";


import BaseTable, {
    AutoResizer,
    Column,
    SortOrder,
} from 'react-base-table'
import 'react-base-table/styles.css'

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { Box } from "@mui/system";
import { Chip, Tooltip } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import EmergencyShareRoundedIcon from '@mui/icons-material/EmergencyShareRounded';

const Category = () => {

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

    const CategoryChoice = ({ category_type }: any) => {
        return (
            <Box sx={{
                pl: 1,
                borderLeft: (category_type === 'PERSONAL' ? '2px solid green' : 'none'),
            }}>{category_type}</Box>
        )
    };

    const ContainsExpired = (props: any) => {
        const { expiredItems } = props;
        return (
            <Box>
                {expiredItems && <WarningRoundedIcon color="warning" />}
                {!expiredItems && <CheckRoundedIcon color="secondary" />}
            </Box>
        )
    };

    const Share = (props: any) => {
        const { contains_sharable_items } = props;
        return (
            <Box>
                {contains_sharable_items && <EmergencyShareRoundedIcon color="secondary" />}
                {!contains_sharable_items && <EmergencyShareRoundedIcon color="warning" />}
            </Box>
        )
    }

    const TableCell = ({ className, cellData }) => (
        <Box className={className}>{cellData}</Box>
    )

    const TableHeaderCell = ({ className, column }) => (
        <Box className={className}>{column.dataKey}</Box>
    )


    const columns = [
        {
            key: "cat_type",
            title: "Type",
            dataKey: "category_type",
            width: 150,
            resizable: true,
            sortable: false,
            editable: true,
            cellRenderer: ({ cellData: category_type }: any) => <CategoryChoice category_type={category_type} />,
            align: Column.Alignment.CENTER,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: "cat_name",
            title: "Name",
            dataKey: "category_name",
            width: 300,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: "cat_desc",
            title: "Description",
            dataKey: "category_description",
            width: 400,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT
        },
        {
            key: "cat_status",
            title: "Status",
            dataKey: "contains_expired_items",
            width: 100,
            resizable: true,
            sortable: true,
            editable: true,
            cellRenderer: ({ cellData: expiredItems }: any) => <ContainsExpired expiredItems={expiredItems}
            />
        },
        {
            key: "cat_tag",
            title: "Category Tags",
            dataKey: "category_tags",
            width: 150,
            resizable: true,
            sortable: true,
            editable: true,
            cellRenderer: ({ cellData: tags }: any) => <DisplayTag tags={tags}
            />
        },
        {
            key: "contains_sharable_items",
            title: "Sharing",
            dataKey: "contains_sharable_items",
            width: 150,
            resizable: true,
            sortable: true,
            editable: true,
            align: Column.Alignment.CENTER,
            frozen: Column.FrozenDirection.RIGHT,
            cellRenderer: ({ cellData: contains_sharable_items }: any) => <Share contains_sharable_items={contains_sharable_items} />
        },
        {
            key: "created_on",
            title: "Created On",
            dataKey: "created_on",
            width: 250,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.RIGHT
        },
    ];

    const defaultSort = { key: "name", order: SortOrder.ASC };

    const [datasets, setDatasets] = useState<any | null>([]);
    const [sortBy, setSortBy] = useState(defaultSort);

    const onColumnSort = (sortBy) => {
        const order = sortBy.order === SortOrder.ASC ? 1 : -1;
        const data = [...datasets];
        data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
        setDatasets(data);
        setSortBy(sortBy);
    };


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
                        sortBy={sortBy}
                        onColumnSort={onColumnSort}
                        components={{ TableCell, TableHeaderCell }}
                    />
                )}
            </AutoResizer>
        </Box>

    )
};

export default Category;