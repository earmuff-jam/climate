
import React from "react";
import BaseTable, {
    AutoResizer,
    Column,
    SortOrder, // do not remove
} from 'react-base-table'
import 'react-base-table/styles.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import AddItem from "./AddItem";
import { Box } from "@mui/system";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DownloadXcelForData from "./DownloadXcelForData";
import DisplayAttentionItems from "./DisplayAttentionItems";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightAltRoundedIcon from '@mui/icons-material/HighlightAltRounded';
import { useDeriveCategoryPageProperties } from './CategoryHooks';
import { regularAndHigherScreenSx, smallScreenSx, emptyRenderer, CATEGORY_COLUMNS } from "./constants";

const CategoryPage = ({ datasets }) => {

    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        data,
        pageProperties,
        onColumnSort,
        rowData,
        setRowData,
        updatePageProperties,
    } = useDeriveCategoryPageProperties(datasets);

    const formattedColumns = [
        ...CATEGORY_COLUMNS,
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

    return (
        <Box style={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>
            <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => updatePageProperties('addCategorySelection', true)}> Add Category
                </Button>
            </Box>
            {pageProperties?.addCategorySelection &&
                <AddCategory
                    addCategorySelection={pageProperties?.addCategorySelection}
                    updatePageProperties={updatePageProperties} />
            }
            {pageProperties?.addItemSelection &&
                <AddItem
                    rowData={rowData}
                    addItemSelection={pageProperties?.addItemSelection}
                    setAddItemSelection={() => updatePageProperties('addItemSelection', true)} />
            }
            {
                pageProperties?.editMode &&
                <EditCategory
                    rowData={rowData}
                    editMode={pageProperties?.editMode}
                    handleEditMode={() => updatePageProperties('editMode', true)}
                />
            }
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        columns={formattedColumns}
                        data={data}
                        width={width}
                        height={height}
                        sortBy={pageProperties?.sortBy}
                        onColumnSort={onColumnSort}
                        emptyRenderer={emptyRenderer}
                    />
                )}
            </AutoResizer>
            <Dialog
                open={pageProperties?.displayModal}
                onClose={() => updatePageProperties('displayModal', false)}
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
                        onClick={() => updatePageProperties('displayModal', false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={pageProperties?.displayDownloadIcon}
                onClose={() => updatePageProperties('displayDownloadIcon', false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Download selected report"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            pageProperties?.downloadCategoryName &&
                            <DownloadXcelForData
                                downloadCategoryName={pageProperties?.downloadCategoryName}
                            />
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => updatePageProperties('displayDownloadIcon', false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default CategoryPage;