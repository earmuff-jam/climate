export const ADD_PROPERTY_FORM_FIELDS = {
  name: {
    value: "",
    label: "Name",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Name is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "Name should be less than 50 characters",
      },
    ],
  },
  address: {
    value: "",
    label: "Address",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Address is required",
      },
      {
        validate: (value) => value.trim().length >= 200,
        message: "Address should be less than 200 characters",
      },
    ],
  },
  sqft: {
    value: "",
    label: "Square Feet",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Square Feet should be greater than 0",
      },
    ],
  },
  image: {
    value: "",
    label: "Image URL",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Image URL is required",
      },
      {
        validate: (value) => !/^https?:\/\/.+/.test(value),
        message: "Image URL should start with http:// or https://",
      },
    ],
  },
  yearbuilt: {
    value: "",
    label: "Year Built",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Year Built should be greater than 0",
      },
      {
        validate: (value) => value > new Date().getFullYear(),
        message: "Year Built should be less than or equal to the current year",
      },
    ],
  },
  garage: {
    value: "",
    label: "Garage",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Garage count should be greater than 0",
      },
    ],
  },
  rent: {
    value: "",
    label: "Rent",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Rent count should be greater than 0",
      },
    ],
  },
  bedrooms: {
    value: "",
    label: "Bedrooms",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Bedrooms count should be greater than 0",
      },
    ],
  },
  bathrooms: {
    value: "",
    label: "Bathrooms",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value <= 0,
        message: "Bathrooms count should be greater than 0",
      },
    ],
  },
};

export const ADD_TENANT_FORM_FIELDS = {
  firstName: {
    value: "",
    label: "First Name",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "First Name is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "First Name should be less than 50 characters",
      },
    ],
  },
  lastName: {
    value: "",
    label: "Last Name",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Last Name is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "Last Name should be less than 50 characters",
      },
    ],
  },
  email: {
    value: "",
    label: "Email",
    type: "email",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Email is required",
      },
      {
        validate: (value) =>
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
        message: "Invalid email address",
      },
    ],
  },
  phone: {
    value: "",
    label: "Phone",
    type: "tel",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Phone is required",
      },
      {
        validate: (value) =>
          !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i.test(value),
        message: "Invalid phone number",
      },
    ],
  },
  dob: {
    value: "",
    label: "Date of Birth",
    type: "date",
    required: true,
    errorMsg: "",
    validators: [],
  },
  occupation: {
    value: "",
    label: "Occupation",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [],
  },
  employer: {
    value: "",
    label: "Employer",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [],
  },
  monthlyIncome: {
    value: "",
    label: "Monthly Income",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value < 0,
        message: "Monthly Income cannot be negative",
      },
    ],
  },
  emergencyContactName: {
    value: "",
    label: "Emergency Contact Name",
    type: "text",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value === 0,
        message: "Emergency Contact Name cannot be empty",
      },
    ],
  },
  emergencyContactPhone: {
    value: "",
    label: "Emergency Contact Phone",
    type: "tel",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Emergency Contact Phone is required",
      },
      {
        validate: (value) =>
          !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i.test(value),
        message: "Invalid phone number",
      },
    ],
  },
  moveInDate: {
    value: "",
    label: "Move-in Date",
    type: "date",
    required: true,
    errorMsg: "",
    validators: [],
  },
  leaseDuration: {
    value: "",
    label: "Lease Duration (in months)",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value < 0,
        message: "Lease Duration cannot be negative",
      },
    ],
  },
  rentAmount: {
    value: "",
    label: "Monthly Rent Amount",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value < 0,
        message: "Rent Amount cannot be negative",
      },
    ],
  },
  securityDepositAmount: {
    value: "",
    label: "Security Deposit Amount",
    type: "number",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value < 0,
        message: "Security Deposit Amount cannot be negative",
      },
    ],
  },
  petAllowed: {
    value: false,
    label: "Are pets allowed?",
    type: "checkbox",
    required: false,
    errorMsg: "",
    validators: [],
  },
  petDescription: {
    value: "",
    label: "Pet Description",
    type: "text",
    required: false,
    errorMsg: "",
    validators: [],
  },
  backgroundCheckConsent: {
    value: false,
    label: "Consent to Background Check?",
    type: "checkbox",
    required: false,
    errorMsg: "",
    validators: [],
  },
};
