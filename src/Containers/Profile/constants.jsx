/**
 * Profile drawer navigation items
 */
export const PROFILE_DRAWER_NAVIGATION_ITEMS = ['Profile', 'Account', 'Notifications', 'Display'];

/**
 * Blank profile details to update user information
 */
export const BLANK_PROFILE_DETAILS = {
  username: {
    id: 'username',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 3,
        message: 'Username is required and must be more than characters',
      },
    ],
  },
  first_name: {
    id: 'first_name',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'First name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'First name should be less than 50 characters',
      },
    ],
  },
  last_name: {
    id: 'last_name',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Last name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Last name should be less than 50 characters',
      },
    ],
  },
  bio: {
    id: 'bio',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Bio should be less than 500 characters',
      },
    ],
  },
};
