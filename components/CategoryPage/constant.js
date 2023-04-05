import { Box, Tooltip } from "@mui/material";

export const DEFAULT_COLUMN_PROPERTIES = {
    width: 150,
    resizable: true,
    sortable: true,
};

export const CATEGORY_COLUMNS = {
    key: 'name',
    title: 'Name',
    dataKey: 'category_name',
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({rowData}) => (
        <Box sx={nameSx}
        >
            <Tooltip title={`${rowData?.category_type.toLowerCase()} category`}>
                <span>{rowData?.category_name}</span>
            </Tooltip>
        </Box>
    )
};