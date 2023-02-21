
import React, {
    useEffect,
    useState,
} from "react";

import BaseTable, {
    AutoResizer,
    Column,
    SortOrder, // do not remove
} from 'react-base-table'
import 'react-base-table/styles.css'

import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import moment from "moment";
import { Box } from "@mui/system";

import AddItem from "../CategoryPage/AddItem";
import EditItem from "../CategoryPage/EditItem";

import {
    regularAndHigherScreenSx,
    smallScreenSx,
} from "../CategoryPage/constants";

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';

import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightAltRoundedIcon from '@mui/icons-material/HighlightAltRounded';

import EmergencyShareRoundedIcon from '@mui/icons-material/EmergencyShareRounded';


const ItemPage = ({ datasets }) => {

    const theme = useTheme();
    const defaultSort = {
        key: "name",
        order: SortOrder.ASC,
    };
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [data, setData] = useState(datasets);
    const [rowData, setRowData] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSort);

    const handleEditMode = (val) => setEditMode(val);

    const onColumnSort = (sortBy) => {
        const order = sortBy.order === SortOrder.ASC ? 1 : -1;
        const data = [...datasets];
        data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
        setData(data);
        setSortBy(sortBy);
    };

    const emptyRenderer = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                Sorry, no matching records found.
            </Box>
        )
    };
    const DisplayTag = (props) => {
        const { item_tag } = props;
        return (
            <>
                {
                    item_tag?.map((el) => (
                        <Chip
                            key={el.id}
                            label={el.tag_name}
                            size={"small"}
                        >
                            {el.tag_name}
                        </Chip>
                    ))
                }
            </>
        )
    };

    const columns = [
        {
            key: "action",
            width: 50,
            cellRenderer: ({ rowData }) => (
                <IconButton
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                        setRowData(rowData); // save which row the user clicked
                        handleEditMode(true);
                    }}
                >
                    <EditRoundedIcon />
                </IconButton>
            )
        },
        {
            key: "item_name",
            title: "Item Name",
            dataKey: "item_name",
            width: 150,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ rowData }) => <Tooltip title={rowData?.item_name}>
                <Box sx={{
                    pl: 1,
                    borderLeft: (rowData?.sharable_groups?.length > 1 ? '2px solid green' : 'none'),
                }}
                >
                    <span>{rowData?.item_name}</span>
                </Box>
            </Tooltip>
        },
        {
            key: "item_desc",
            title: "Item Description",
            dataKey: "item_description",
            width: 350,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: item_description }) => <Tooltip title={item_description}><span>{item_description}</span></Tooltip>
        },
        {
            key: "item_quantity",
            title: "Item Quantity",
            dataKey: "quantity",
            width: 100,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ rowData }) => <Tooltip title={rowData?.quantity}><span>{rowData?.quantity}</span></Tooltip>
        },
        {
            key: "item_tag",
            title: "Item Tags",
            dataKey: "item_tag",
            width: 150,
            resizable: true,
            sortable: true,
            editable: true,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ rowData }) => <DisplayTag item_tag={rowData?.item_tag}
            />
        },
        {
            key: "use_by_date",
            title: "Use",
            dataKey: "use_by_date",
            width: 150,
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) => (
                <Box sx={{ fontSize: '11px' }}>
                    <span>{moment(rowData?.use_by_date).fromNow()}</span>
                </Box>
            )
        },
        {
            key: "created_on",
            title: "Created",
            dataKey: "created_on",
            width: 150,
            sortable: true,
            cellRenderer: ({ rowData }) =>
                <Typography
                    sx={{ fontSize: '11px' }}
                >
                    {moment(rowData?.created_on).fromNow()}
                </Typography>
        },
        {
            key: "created_by",
            title: "Created By",
            dataKey: "created_by",
            width: 200,
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) => (
                <Box sx={{ fontSize: '11px' }}>
                    <span>{rowData?.created_by}</span>
                </Box>
            )
        },
    ];

    useEffect(() => {
        setData(datasets);
    }, [datasets])

    return (
        <Box style={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>

            {
                editMode &&
                <EditItem
                    rowData={rowData}
                    editMode={editMode}
                    handleEditMode={handleEditMode}
                />
            }

            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        columns={columns}
                        data={data}
                        width={width}
                        height={height}
                        sortBy={sortBy}
                        onColumnSort={onColumnSort}
                        emptyRenderer={emptyRenderer}
                    />
                )}
            </AutoResizer>
        </Box>
    )
};

export default ItemPage;