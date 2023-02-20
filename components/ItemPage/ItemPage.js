
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
    const [selectRow, setSelectRow] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSort);
    const [displayModal, setDisplayModal] = useState(false);
    const [addItemSelection, setAddItemSelection] = useState(false);

    const [displayDownloadIcon, setDisplayDownloadIcon] = useState(false);
    const [downloadCategoryName, setDownloadCategoryName] = useState(false);
    const [addCategorySelection, setAddCategorySelection] = useState(false);

    const handleEditMode = (val) => setEditMode(val);
    const handleAddCategory = () => setAddCategorySelection(!addCategorySelection);
    const handleAddItem = () => setAddItemSelection(!addItemSelection);

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

    const Share = (props) => {
        const { sharable_groups } = props;
        const currentlySharing = sharable_groups.length > 1;
        return (
            <Box>
                <Tooltip title={`${currentlySharing ? 'Currently sharing' : 'Not Sharing '}`}>
                    <span>
                        {currentlySharing && <EmergencyShareRoundedIcon color="secondary" />}
                        {!currentlySharing && <EmergencyShareRoundedIcon color="warning" />}
                    </span>
                </Tooltip>
            </Box>
        )
    }

    const handleSelectRow = (e) => {
        setSelectRow(e.target.checked);
    }

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
            title: "Name",
            dataKey: "item_name",
            width: 200,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: item_name }) => <Tooltip title={item_name}><span>{item_name}</span></Tooltip>
        },
        {
            key: "item_desc",
            title: "Description",
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
            key: "sharing",
            title: "Currently sharing",
            dataKey: "sharable_groups",
            width: 100,
            resizable: true,
            sortable: false,
            cellRenderer: ({ cellData: sharable_groups }) => <Share sharable_groups={sharable_groups} />
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
            cellRenderer: ({ cellData: item_tag }) => <DisplayTag item_tag={item_tag}
            />
        },
        {
            key: "created_on",
            title: "Created",
            dataKey: "created_on",
            width: 250,
            sortable: true,
            cellRenderer: ({ cellData: created_on }) => <Typography>{moment(created_on).fromNow()}</Typography>
        },
    ];

    useEffect(() => {
        setData(datasets);
    }, [datasets, addItemSelection])

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