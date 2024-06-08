import { BookmarkAddedRounded, KitchenRounded, ShoppingBagRounded } from '@mui/icons-material';

export const VIEW_CATEGORY_LIST = [
  {
    category_name: 'Bookmarked Items',
    category_description: 'Items that are labelled as bookmark',
    icon: <BookmarkAddedRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: 'primary.main',
  },
  {
    category_name: 'Kitchen and food',
    category_description: 'Items that are categorized under kitchen and pantry',
    icon: <KitchenRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: 'warning.main',
  },
  {
    category_name: 'Shopping',
    category_description: 'Items that are categorized under shopping',
    icon: <ShoppingBagRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: 'error.main',
  },
];
