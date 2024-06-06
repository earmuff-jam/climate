/**
 * Item type mapper fn is used to map the maintenance item types to respective indices
 */
export const ITEM_TYPE_MAPPER = {
  1: 'Daily',
  2: 'Weekly',
  3: 'Bi-Weekly',
  4: 'Monthly',
  5: 'Quaterly',
  6: 'Semi-annually',
  7: 'Annually',
};

export const BLANK_MAINTENANCE_PLAN = {
  plan: {
    id: 'plan',
    value: '',
    required: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Plan name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Plan name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    value: '',
    required: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Plan description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Plan description should be less than 500 characters',
      },
    ],
  },
};
