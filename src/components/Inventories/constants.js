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
    href: '/maintenance',
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
    href: '/inventories/details',
  },
];

/**
 * INVENTORY LIST HEADERS STATIC COMPONENT
 * displayConcise lets users view the column name in bookmarked inventories
 * modifier fn lets the value be modified, for eg date will be modified with this property
 */
export const VIEW_INVENTORY_LIST_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'Item name',
    displayConcise: true,
    modifier: (value) => `${value}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Item Description',
    displayName: 'Description',
    modifier: (value) => `${value}`,
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'Cost',
    displayConcise: true,
    modifier: (value) => `${value}`,
  },
  status: {
    id: 4,
    colName: 'status',
    label: 'Status',
    modifier: (value) => `${value}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'Barcode',
    modifier: (value) => `${value}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (value) => `${value}`,
  },
  quantity: {
    id: 7,
    colName: 'quantity',
    label: 'Quantity',
    modifier: (value) => `${value}`,
  },
  location: {
    id: 8,
    colName: 'location',
    label: 'Storage location',
    displayConcise: true,
    modifier: (value) => `${value}`,
  },
  is_returnable: {
    id: 9,
    colName: 'is_returnable',
    label: 'Returnable',
    modifier: (value) => `${value}`,
  },
  return_location: {
    id: 10,
    colName: 'return_location',
    label: 'Return Location',
    modifier: (value) => `${value}`,
  },
  max_weight: {
    id: 11,
    colName: 'max_weight',
    label: 'Max Weight',
    modifier: (value) => `${value}`,
  },
  min_weight: {
    id: 12,
    colName: 'min_weight',
    label: 'Min Weight',
    modifier: (value) => `${value}`,
  },
  max_height: {
    id: 13,
    colName: 'max_height',
    label: 'Max Height',
    modifier: (value) => `${value}`,
  },
  min_height: {
    id: 14,
    colName: 'min_height',
    label: 'Min Height',
    modifier: (value) => `${value}`,
  },
  updated_at: {
    id: 15,
    colName: 'updated_at',
    label: 'Updated At',
    displayConcise: true,
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
    displayConcise: true,
    modifier: (value) => `${value}`,
  },
  bought_at: {
    id: 18,
    colName: 'bought_at',
    label: 'Purchase Location',
    modifier: (value) => `${value}`,
  },
};

// blank inventory form
export const BLANK_INVENTORY_FORM = {
  id: '',
  name: '',
  description: '',
  price: '',
  barcode: '',
  sku: '',
  quantity: '',
  bought_at: '',
  location: '',
  storage_location_id: '',
  is_bookmarked: '',
  is_returnable: '',
  return_location: '',
  max_weight: '',
  min_weight: '',
  max_height: '',
  min_height: '',
  created_on: '',
  created_by: '',
  updated_on: '',
  updated_by: '',
  sharable_groups: '',
};

// erorr handling for adding an inventory form
export const BLANK_INVENTORY_FORM_ERROR = {
  name: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item name should be less than 50 characters',
      },
    ],
  },
  description: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item description is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item description should be less than 50 characters',
      },
    ],
  },
  price: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  barcode: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of item should be less than 50 characters',
      },
    ],
  },
  quantity: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  bought_at: {
    errorMsg: '',
    validators: [],
  },
  location: {
    errorMsg: '',
    validators: [],
  },
  is_bookmarked: {
    errorMsg: '',
    validators: [],
  },
  is_returnable: {
    errorMsg: '',
    validators: [],
  },
  return_location: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  return_datetime: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value < new Date().toISOString(),
        message: 'Return datetime cannot be an eariler date or time',
      },
    ],
  },
  max_weight: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_weight: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  max_height: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_height: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  created_on: {
    errorMsg: '',
    validators: [],
  },
  created_by: {
    errorMsg: '',
    validators: [],
  },
  updated_on: {
    errorMsg: '',
    validators: [],
  },
  updated_by: {
    errorMsg: '',
    validators: [],
  },
  sharable_groups: {
    errorMsg: '',
    validators: [],
  },
};
