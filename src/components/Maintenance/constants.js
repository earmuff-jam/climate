export const GENERIC_FORM_FIELDS = {
  type: "text",
  variant: "static",
};
export const ADD_MAINTENANCE_FORM = {
  name: {
    value: "",
    name: "name",
    label: "Inspection Name",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Inspection Name is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "Inspection Name should be less than 50 characters",
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  inspection_date: {
    name: "inspection_date",
    value: "",
    label: "Start inspection on",
    type: "datetime-local",
    variant: "static",
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Current Inspection Date is required",
      },
      {
        validate: (value) => value.trim().length >= 20,
        message: "Current Inspection Date is unusually long",
      },
    ],
  },
  inspection_type: {
    name: "inspection_type",
    value: "",
    label: "Select type of Inspection",
    type: "date",
    variant: "static",
    required: true,
    options: [
      "Annual Inventory",
      "Semi Annual Inventory",
      "Quarterly Inventory",
      "Monthly Inventory",
      "Weekly Inventory",
    ],
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Type of Inspection is required",
      },
    ],
  },
  general_comments: {
    name: "general_comments",
    value: "",
    label: "Additional Comments",
    ...GENERIC_FORM_FIELDS,
    required: false,
  },
  signature: {
    name: "signature",
    value: "",
    label: "Digital Signature",
    ...GENERIC_FORM_FIELDS,
    required: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Acknowledgement is required",
      },
    ],
  },
};
export const ADD_ISSUE_DETAILS_FORM = {
  details: {
    label: "Issue Details",
    placeholder: "",
    value: "",
    name: "issue_details",
    errorMsg: "",
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Issue Details is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "Issue Details should be less than 50 characters",
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: "Issue Description",
    placeholder: "",
    value: "",
    name: "issue_description",
    errorMsg: "",
    required: false,
    validators: [],
    ...GENERIC_FORM_FIELDS,
  },
};
export const ADD_MAINTENANCE_LOG_FORM = {
  details: {
    label: "Maintenance Log Details",
    placeholder: "",
    value: "",
    name: "maintenance_log_details",
    errorMsg: "",
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Maintenance Log Details is required",
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: "Maintenance Log Description",
    placeholder: "",
    value: "",
    name: "maintenance_log_description",
    errorMsg: "",
    required: false,
    validators: [],
    ...GENERIC_FORM_FIELDS,
  },
};
export const ADD_WORK_ORDER_FORM = {
  details: {
    label: "Work Order Details",
    placeholder: "",
    value: "",
    name: "work_order_details",
    errorMsg: "",
    required: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Work Order Details is required",
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: "Work Order Description",
    placeholder: "",
    value: "",
    name: "work_order_description",
    errorMsg: "",
    required: false,
    validators: [],
    ...GENERIC_FORM_FIELDS,
  },
};
export const OVERALL_MAINTENANCE_STATUS = {
  overall_maintenance_status: {
    name: "overall_maintenance_status",
    value: "",
    label: "Overall State of Maintenance",
    options: ["Submitted", "Pending", "Created", "Completed", "Resolved"],
    ...GENERIC_FORM_FIELDS,
  },
};
// default values for issues, maintenance and work order form
export const DEFAULT_DETAILS_TAB_FORM = [
  {
    id: 1,
    label: "issue",
    title: "Issue",
    data: ADD_ISSUE_DETAILS_FORM,
  },
  {
    id: 2,
    label: "maintenance_logs",
    title: "Maintenance Logs",
    data: ADD_MAINTENANCE_LOG_FORM,
  },
  {
    id: 3,
    label: "work_order",
    title: "Work Order",
    data: ADD_WORK_ORDER_FORM,
  },
];
