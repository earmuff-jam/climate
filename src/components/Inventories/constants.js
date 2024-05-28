import {
  AssignmentLateRounded,
  BookmarkAddedRounded,
  KitchenRounded,
  ShoppingBagRounded,
} from '@mui/icons-material';

/**
 * default inventories landing page items to encourage users to use
 * various features of the application
 */
export const DEFAULT_INVENTORIES_LANDING_PAGE_TEXT = [
  {
    name: 'Create Maintenance Request',
    description: 'Create periodic maintenance of inventory items',
    imageSrc: 'images/books.jpg',
    imageAlt: 'default-maintenance-inventory-items-img',
    href: '/inventories',
  },
  {
    name: 'Track record of inventories',
    description:
      'Visualize items which are due for maintenance or need attention',
    imageSrc: 'images/items.jpg',
    imageAlt: 'default-track-record-inventory-items-img',
    href: '/forecast',
  },
  {
    name: 'Stay in sync with your inventory items',
    description:
      'Understand your inventories better. Keep tabs on more important inventories',
    imageSrc: 'images/kitchen-items.jpg',
    imageAlt: 'default-bookmarked-inventory-items-img',
  },
];

export const VIEW_INVENTORY_CATEGORIES = [
  {
    name: 'Bookmarked Items',
    description: 'Items that are labelled as bookmark',
    icon: <BookmarkAddedRounded />,
    expensesInPercent: 0,
    color: 'primary.main',
  },
  {
    name: 'Kitchen and food',
    description: 'Items that are categorized under kitchen and pantry',
    icon: <KitchenRounded />,
    expensesInPercent: 0,
    color: 'warning.main',
  },
  {
    name: 'Shopping',
    description: 'Items that are categorized under shopping',
    icon: <ShoppingBagRounded />,
    expensesInPercent: 0,
    color: 'error.main',
  },
];

export const VIEW_INVENTORY_LIST_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'Item name',
    modifier: (title) => `${title}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Item Description',
    displayName: 'Description',
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'Cost',
    modifier: (title) => `${title}`,
  },
  status: {
    id: 4,
    colName: 'status',
    label: 'Status',
    modifier: (title) => `${title}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'Barcode',
    modifier: (title) => `${title}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (title) => `${title}`,
  },
  quantity: {
    id: 7,
    colName: 'quantity',
    label: 'Quantity',
    modifier: (title) => `${title}`,
  },
  location: {
    id: 8,
    colName: 'location',
    label: 'Storage location',
    modifier: (title) => `${title}`,
  },
  is_returnable: {
    id: 9,
    colName: 'is_returnable',
    label: 'Returnable',
    modifier: (title) => `${title}`,
  },
  return_location: {
    id: 10,
    colName: 'return_location',
    label: 'Return Location',
    modifier: (title) => `${title}`,
  },
  max_weight: {
    id: 11,
    colName: 'max_weight',
    label: 'Max Weight',
    modifier: (title) => `${title}`,
  },
  min_weight: {
    id: 12,
    colName: 'min_weight',
    label: 'Min Weight',
    modifier: (title) => `${title}`,
  },
  max_height: {
    id: 13,
    colName: 'max_height',
    label: 'Max Height',
    modifier: (title) => `${title}`,
  },
  min_height: {
    id: 14,
    colName: 'min_height',
    label: 'Min Height',
    modifier: (title) => `${title}`,
  },
  updated_at: {
    id: 15,
    colName: 'updated_at',
    label: 'Updated At',
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  created_at: {
    id: 16,
    colName: 'created_at',
    label: 'Created At',
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  updater_name: {
    id: 17,
    colName: 'updater_name',
    label: 'Updated By',
    modifier: (title) => `${title}`,
  },
  bought_at: {
    id: 18,
    colName: 'bought_at',
    label: 'Purchase Location',
    modifier: (title) => `${title}`,
  },
};
