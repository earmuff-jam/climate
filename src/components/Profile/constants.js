export const BLANK_NOTIFICATION_DETAILS = {
  notify_bookmarked_items: false,
  notify_due_items: false,
  notify_settings_privacy: false,
};

export const BLANK_PROFILE_DETAILS = {
  username: '',
  firstname: '',
  lastname: '',
  bio: '',
};

export const BLANK_PROFILE_DETAILS_ERROR = {
  username: {
    id: 'username',
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
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Bio should be less than 500 characters',
      },
    ],
  },
};
