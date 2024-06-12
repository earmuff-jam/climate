// blank form to add inventory details
export const BLANK_INVENTORY_FORM = {
  name: {
    id: 'name',
    label: 'Item name',
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
    label: 'Item description',
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
    label: 'Item price (per unit)',
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
    label: 'Barcode of item',
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
    label: 'Sku of item',
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
    label: 'Item quantity',
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
    label: 'Where did you buy the item',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  location: {
    id: 'location',
    label: 'Where do you want to store the item',
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
    label: 'Where to return the item',
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
    type: 'datetime',
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
    label: 'Max weight in kg',
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
    label: 'Min weight in kg',
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
    label: 'Max height in kg',
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
    label: 'Min height in kg',
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
