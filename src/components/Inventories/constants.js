import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * default inventories landing page items to encourage users to use
 * various features of the application
 */
export const DEFAULT_INVENTORIES_LANDING_PAGE_TEXT = [
  {
    name: 'Create and view maintenance request',
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
 * combines the config for host details based on the eventObj parameter. returns a
 * list of tableRows derieved from the eventObj object. If modifier function is passed
 * in, we build the table in accordance to it as well.
 * @param {Object} eventObj - the current selected event to build the table for
 * @returns {Array} tableRows - the combined row with modifiers applied if passed in.
 */
export const BUILD_TABLE_CONSTANTS = (columnLabels) => (eventObj) => {
  if (!eventObj) {
    return [];
  }
  const tableRows = columnLabels.map(({ id, colName, label, modifier }) => {
    let value = eventObj[colName];
    if (modifier) {
      value = modifier(value, { colName, label });
    } else {
      value = value || 'N/A';
    }
    return {
      id,
      colName,
      label,
      value,
    };
  });

  return tableRows;
};

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
    modifier: (value) => `${value || '-'}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Item Description',
    displayName: 'Description',
    modifier: (value) => `${value || '-'}`,
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'Cost',
    displayConcise: true,
    modifier: (value) => `${value || '-'}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'Barcode',
    modifier: (value) => `${value || '-'}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (value) => `${value || '-'}`,
  },
  quantity: {
    id: 7,
    colName: 'quantity',
    label: 'Quantity',
    modifier: (value) => `${value || '-'}`,
  },
  location: {
    id: 8,
    colName: 'location',
    label: 'Storage location',
    displayConcise: true,
    modifier: (value) => `${value || '-'}`,
  },
  is_returnable: {
    id: 9,
    colName: 'is_returnable',
    label: 'Returnable',
    modifier: (value) => `${value || '-'}`,
  },
  return_location: {
    id: 10,
    colName: 'return_location',
    label: 'Return Location',
    modifier: (value) => `${value || '-'}`,
  },
  max_weight: {
    id: 11,
    colName: 'max_weight',
    label: 'Max Weight',
    modifier: (value) => `${value || '-'}`,
  },
  min_weight: {
    id: 12,
    colName: 'min_weight',
    label: 'Min Weight',
    modifier: (value) => `${value || '-'}`,
  },
  max_height: {
    id: 13,
    colName: 'max_height',
    label: 'Max Height',
    modifier: (value) => `${value || '-'}`,
  },
  min_height: {
    id: 14,
    colName: 'min_height',
    label: 'Min Height',
    modifier: (value) => `${value || '-'}`,
  },
  updated_at: {
    id: 15,
    colName: 'updated_at',
    label: 'Updated At',
    displayConcise: true,
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  updator_name: {
    id: 17,
    colName: 'updator_name',
    label: 'Updated By',
    displayConcise: true,
    modifier: (value) => `${value?.username || '-'}`,
  },
  bought_at: {
    id: 18,
    colName: 'bought_at',
    label: 'Purchase Location',
    modifier: (value) => `${value || '-'}`,
  },
};

// blank form to add inventory details
export const BLANK_INVENTORY_FORM = {
  name: {
    id: 'name',
    value: '',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item name is required',
      },
      {
        validate: (value) => value.trim().length >= 200,
        message: 'Item name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    value: '',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Item description should be less than 50 characters',
      },
    ],
  },
  price: {
    id: 'price',
    value: '',
    isRequired: false,
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
    id: 'barcode',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    id: 'sku',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of item should be less than 50 characters',
      },
    ],
  },
  quantity: {
    id: 'quantity',
    value: '',
    isRequired: true,
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
    id: 'bought_at',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  location: {
    id: 'location',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  is_bookmarked: {
    id: 'is_bookmarked',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  is_returnable: {
    id: 'is_returnable',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  return_location: {
    id: 'return_location',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  return_datetime: {
    id: 'return_datetime',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value < new Date().toISOString(),
        message: 'Return datetime cannot be an eariler date or time',
      },
    ],
  },
  max_weight: {
    id: 'max_weight',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_weight: {
    id: 'min_weight',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  max_height: {
    id: 'max_height',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_height: {
    id: 'min_height',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  created_on: {
    id: 'created_on',
    errorMsg: '',
    validators: [],
  },
  created_by: {
    id: 'created_by',
    errorMsg: '',
    validators: [],
  },
  updated_on: {
    id: 'updated_on',
    errorMsg: '',
    validators: [],
  },
  updated_by: {
    id: 'updated_by',
    errorMsg: '',
    validators: [],
  },
  sharable_groups: {
    id: 'sharable_groups',
    errorMsg: '',
    validators: [],
  },
};
