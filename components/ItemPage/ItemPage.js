
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

import AddCategory from "../CategoryPage/AddCategory";
import EditCategory from "../CategoryPage/EditCategory";

import DownloadXcelForData from "../CategoryPage/DownloadXcelForData";
import DisplayAttentionItems from "../CategoryPage/DisplayAttentionItems";
import { regularAndHigherScreenSx, smallScreenSx } from "../CategoryPage/constants";

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

    const ItemChoice = ({ category_type }) => {
        return (
            <Box sx={{
                pl: 1,
                borderLeft: (category_type === 'PERSONAL' ? '2px solid green' : 'none'),
            }}>
                {category_type}
            </Box>
        )
    };

    const ContainsExpired = (props) => {
        const { expiredItems } = props;
        return (
            <Box>
                {expiredItems && <WarningRoundedIcon color="warning" />}
                {!expiredItems && <CheckRoundedIcon color="secondary" />}
            </Box>
        )
    };

    const Share = (props) => {
        const { contains_sharable_items } = props;
        return (
            <Box>
                <Tooltip title={`${contains_sharable_items ? 'Currently sharing' : 'Not Sharing '}`}>
                    <span>
                        {contains_sharable_items && <EmergencyShareRoundedIcon color="secondary" />}
                        {!contains_sharable_items && <EmergencyShareRoundedIcon color="warning" />}
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
                        handleAddItem(true);
                    }}
                >
                    <AddCircleRoundedIcon />
                </IconButton>
            )
        },
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
            width: 300,
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
            width: 400,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: item_description }) => <Tooltip title={item_description}><span>{item_description}</span></Tooltip>
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
        {
            key: "action",
            width: 100,
            frozen: Column.FrozenDirection.RIGHT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ rowData }) => (
                <IconButton
                    size="small"
                    edge="start"
                    color="secondary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={(e) => {
                        handleSelectRow(e);
                        setDownloadCategoryName(rowData.item_name);
                        setDisplayDownloadIcon(true);
                    }}
                >
                    <GetAppRoundedIcon />
                </IconButton>
            ),
        }
    ];

    useEffect(() => {
        setData(datasets);
    }, [datasets, addCategorySelection])

    return (
        <Box style={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>

            <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleAddCategory}> Add Category
                </Button>
            </Box>
            {addCategorySelection &&
                <AddCategory
                    addCategorySelection={addCategorySelection}
                    setAddCategorySelection={setAddCategorySelection} />
            }
            {addItemSelection &&
                <AddItem
                    rowData={rowData}
                    addItemSelection={addItemSelection}
                    setAddItemSelection={setAddItemSelection} />
            }

            {
                editMode &&
                <EditCategory
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
            <Dialog
                open={displayModal}
                onClose={() => setDisplayModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Items Quickview"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DisplayAttentionItems rowData={rowData} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setDisplayModal(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={displayDownloadIcon}
                onClose={() => setDisplayDownloadIcon(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Download selected report"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            downloadCategoryName &&
                            <DownloadXcelForData
                                downloadCategoryName={downloadCategoryName}
                            />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setDisplayDownloadIcon(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default ItemPage;