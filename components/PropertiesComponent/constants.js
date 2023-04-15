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
