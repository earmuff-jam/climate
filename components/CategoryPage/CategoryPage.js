
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
import AddItem from "./AddItem";
import { Box } from "@mui/system";

import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

import DownloadXcelForData from "./DownloadXcelForData";
import DisplayAttentionItems from "./DisplayAttentionItems";
import { regularAndHigherScreenSx, smallScreenSx } from "./constants";

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightAltRoundedIcon from '@mui/icons-material/HighlightAltRounded';


const CategoryPage = ({ datasets }) => {

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
        const { category_tag } = props;
        return (
            <>
                {
                    category_tag?.map((el) => (
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

    const handleSelectRow = (e) => {
        setSelectRow(e.target.checked);
    }

    const columns = [
        {
            key: "cat_name",
            title: "Name",
            width: 150,
            dataKey: "category_name",
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) =>
            (
                <Box sx={{
                    pl: 1,
                    borderLeft: (rowData?.category_type === 'PERSONAL' ? '2px solid green' : 'none'),
                }}
                >
                    <Tooltip title={`${rowData?.category_type.toLowerCase()} category`}>
                        <span>{rowData?.category_name}</span>
                    </Tooltip>
                </Box>
            )
        },
        {
            key: "cat_desc",
            title: "Description",
            dataKey: "category_description",
            width: 250,
            resizable: true,
            sortable: true,
            cellRenderer: ({ cellData: category_description }) => <Tooltip title={category_description}><span>{category_description}</span></Tooltip>
        },
        {
            key: "cat_tag",
            title: "Category Tags",
            dataKey: "category_tag",
            width: 100,
            resizable: true,
            sortable: true,
            cellRenderer: ({ cellData: category_tag }) => <DisplayTag category_tag={category_tag}
            />
        },
        {
            key: "created_on",
            title: "Last Edited",
            dataKey: "created_on",
            width: 150,
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) => (
                <Tooltip title={`${rowData?.expiredItems ? 'items require your attention' : ''}`}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography sx={{ fontSize: '11px' }}>{moment(rowData?.created_on).fromNow()}</Typography>
                    </Box>
                </Tooltip>
            )
        },
        {
            key: "created_by",
            title: "Created By",
            dataKey: "created_by",
            width: 150,
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) => {
                
                return (
                    <Box sx={{ fontSize: '11px' }}>
                        <span>{rowData?.created_by}</span>
                    </Box>
                )
            }
        },
        {
            key: "action",
            title: "Quick Edits",
            width: 200,
            resizable: true,
            sortable: true,
            cellRenderer: ({ rowData }) => (
                <>
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
                    <Tooltip title="Items quickview">
                        <Box>
                            <IconButton
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => {
                                    setRowData(rowData);
                                    setDisplayModal(true);
                                }}
                            >
                                <HighlightAltRoundedIcon />
                            </IconButton>
                        </Box>
                    </Tooltip>
                    <IconButton
                        size="small"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(e) => {
                            handleSelectRow(e);
                            setDownloadCategoryName(rowData.category_name);
                            setDisplayDownloadIcon(true);
                        }}
                    >
                        <GetAppRoundedIcon />
                    </IconButton>
                </>
            )
        },
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

export default CategoryPage;