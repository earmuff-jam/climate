
import React, {
    useEffect,
    useState,
} from "react";

import BaseTable, {
    AutoResizer,
    Column,
    SortOrder,
} from 'react-base-table'
import 'react-base-table/styles.css'

import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { CSVLink } from 'react-csv';
import DownloadXcelForData from "./DownloadXcelForData";
import DisplayAttentionItems from "./DisplayAttentionItems";

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import EmergencyShareRoundedIcon from '@mui/icons-material/EmergencyShareRounded';

const CategoryPage = ({ datasets }) => {

    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = useState(datasets);
    const [rowData, setRowData] = useState([]);
    const [downloadCategoryName, setDownloadCategoryName] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);

    const [selectRow, setSelectRow] = useState(false);

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

    const CategoryChoice = ({ category_type }) => {
        return (
            <Box sx={{
                pl: 1,
                borderLeft: (category_type === 'PERSONAL' ? '2px solid green' : 'none'),
            }}>{category_type}</Box>
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

    const defaultSort = { key: "name", order: SortOrder.ASC };
    const [sortBy, setSortBy] = useState(defaultSort);

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

    const handleSelectRow = (e) => {
        setSelectRow(e.target.checked);
    }

    const columns = [
        {
            key: "cat_type",
            title: "Type",
            dataKey: "category_type",
            width: 150,
            resizable: true,
            sortable: false,
            editable: true,
            cellRenderer: ({ cellData: category_type }) => <CategoryChoice category_type={category_type} />,
            align: Column.Alignment.LEFT,
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
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: category_name }) => <Tooltip title={category_name}><span>{category_name}</span></Tooltip>
        },
        {
            key: "cat_desc",
            title: "Description",
            dataKey: "category_description",
            width: 400,
            resizable: true,
            sortable: true,
            editable: true,
            frozen: Column.FrozenDirection.LEFT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: category_description }) => <Tooltip title={category_description}><span>{category_description}</span></Tooltip>
        },
        {
            key: "cat_status",
            title: "Status",
            dataKey: "contains_expired_items",
            width: 100,
            resizable: true,
            sortable: true,
            editable: true,
            cellRenderer: ({ cellData: expiredItems }) => <ContainsExpired expiredItems={expiredItems}
            />
        },
        {
            key: "cat_tag",
            title: "Category Tags",
            dataKey: "category_tag",
            width: 150,
            resizable: true,
            sortable: true,
            editable: true,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ cellData: category_tag }) => <DisplayTag category_tag={category_tag}
            />
        },
        {
            key: "contains_sharable_items",
            title: "Sharing",
            dataKey: "contains_sharable_items",
            width: 150,
            sortable: true,
            align: Column.Alignment.CENTER,
            cellRenderer: ({ cellData: contains_sharable_items }) => <Share contains_sharable_items={contains_sharable_items} />
        },
        {
            key: "created_on",
            title: "Created On",
            dataKey: "created_on",
            width: 250,
            sortable: true,
        },
        {
            key: "action",
            width: 100,
            cellRenderer: ({ rowData }) => (
                <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                        setRowData(rowData);
                        setDisplayModal(true);
                    }}
                >
                    Items
                </Button>
            )
        },
        {
            key: "action",
            width: 100,
            frozen: Column.FrozenDirection.RIGHT,
            align: Column.Alignment.LEFT,
            cellRenderer: ({ rowData }) => (
                <Checkbox
                    type="checkbox"
                    checked={selectRow}
                    onChange={(e) => {
                        handleSelectRow(e);
                        setDownloadCategoryName(rowData.category_name);
                    }}
                />
            ),

            // cellRenderer: ({ rowData }) => (
            //     <IconButton
            //         size="small"
            //         edge="start"
            //         color="secondary"
            //         aria-label="menu"
            //         sx={{ mr: 2 }}
            //         onClick={() => {
            //             setDownloadCategoryName(rowData.category_name);
            //         }}
            //     >

            //     </IconButton>
            // )
        }
    ];

    const defaultSort = { key: "name", order: SortOrder.ASC };

    const [datasets, setDatasets] = useState([]);
    const [sortBy, setSortBy] = useState(defaultSort);

    const onColumnSort = (sortBy) => {
        const order = sortBy.order === SortOrder.ASC ? 1 : -1;
        const data = [...datasets];
        data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
        setDatasets(data);
        setSortBy(sortBy);
    };

    const emptyRenderer = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                Sorry, no matching records found.
            </Box>
        )
    }

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
        setData(datasets);
    }, [datasets])

    const regularAndHigherScreenSx = { width: "100vm", height: "100vh" };
    const smallScreenSx = { width: '70rem', height: '70rem' };

    return (
        <Box style={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>
            {
                downloadCategoryName &&
                <DownloadXcelForData
                    downloadCategoryName={downloadCategoryName}
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
        </Box>
    )
};

export default CategoryPage;