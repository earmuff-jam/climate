import moment from "moment";
import { Box, Tooltip, Typography, Chip } from "@mui/material";

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MENU_PROPS = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export const TYPE_OPTIONS = [
    {
        id: '1',
        name: 'PERSONAL',
    },
    {
        id: '2',
        name: 'BUSINESS',
    }
];
export const regularAndHigherScreenSx = {
    width: 'calc(50vw + 220px)',
    height: '50vh',
};
export const smallScreenSx = {
    width: '70rem',
    height: '70rem',
};
export const smallFontSx = {
    fontSize: '11px',
};
export const smallSizeSx = {
    width: '25%',
    height: '25%',
};
export const DEFAULT_COLUMN_PROPERTIES = {
    width: 150,
    resizable: true,
    sortable: true,
};
export const displaySecondaryLink = (categoryType, categoryName) => (
    <Box sx={{
        pl: 1,
        borderLeft: (categoryType === 'PERSONAL' ? '2px solid green' : 'none')
    }}>
        <Tooltip title={`${categoryType.toLowerCase()} category`}>
            <span>{categoryName}</span>
        </Tooltip>
    </Box>
);
export const displayTooltipLink = (value) => (
    <Tooltip title={value}>
        <Typography sx={{ ...smallFontSx }}>{value}</Typography>
    </Tooltip>
);
export const emptyRenderer = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', ...smallFontSx}}>
            Sorry, no matching records found.
        </Box>
    )
};
export const DisplayTag = (props) => {
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
export const displayCreated = (rowData) => (
    <Tooltip title={`${rowData?.expiredItems ? 'items require your attention' : ''}`}>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ ...smallFontSx }}>{moment(rowData?.created_on).fromNow()}</Typography>
        </Box>
    </Tooltip>
);

export const CATEGORY_COLUMNS = [{
    key: 'name',
    title: 'Name',
    dataKey: 'category_name',
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({ rowData }) => (
        displaySecondaryLink(rowData?.category_type, rowData?.category_name)
    )
},
{
    key: "description",
    title: "Description",
    dataKey: "category_description",
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({ cellData: category_description }) => (
        displayTooltipLink(category_description)
    )
},
{
    key: "category_tags",
    title: "Category Tags",
    dataKey: "category_tag",
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({ cellData: category_tag }) => <DisplayTag category_tag={category_tag}
    />
},
{
    key: "created_on",
    title: "Last Created On",
    dataKey: "created_on",
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({ rowData }) => displayCreated(rowData)
},
{
    key: "created_by",
    title: "Created By",
    dataKey: "created_by",
    ...DEFAULT_COLUMN_PROPERTIES,
    cellRenderer: ({ rowData }) => displayTooltipLink(rowData?.created_by)
}];