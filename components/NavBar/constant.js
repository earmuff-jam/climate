
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/MoveToInbox';


export const NAV_BAR_OPTIONS = [
    {
        id: 1,
        icon: <SendIcon />,
        primaryText: 'All Categories',
        secondaryText: 'Display all categories',
    },
    {
        id: 2,
        icon: <DraftsIcon />,
        primaryText: 'All Items',
        secondaryText: 'Display all items',
    },
    {
        id: 3,
        icon: <InboxIcon />,
        primaryText: 'Currently sharing',
        secondaryText: 'Display all sharing items',
    },
    {
        id: 4,
        icon: <InboxIcon />,
        primaryText: 'Lost and found',
        secondaryText: 'Display all items that need attention',
    },
];

export const TRENDING_TAG_OPTIONS = [
    {
        id: 1,
        icon: <SendIcon />,
        primaryText: 'toys',
        secondaryText: 'toys', // this is description. should use tooltip,
        numberOfItemsWithinTag: 12,
        isSharable: false,
    },
    {
        id: 2,
        icon: <DraftsIcon />,
        primaryText: 'room',
        secondaryText: 'room',
        numberOfItemsWithinTag: 3,
        isSharable: false,
    },
];