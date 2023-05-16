export const ADD_MAINTENANCE_FORM = {
    name: {
        value: "",
        name: "name",
        label: "Inspection Name",
        type: "text",
        variant: "static",
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
    },
    inspection_date: {
        name: "inspection_date",
        value: "",
        label: "Start inspection on",
        type: "date",
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
        type: "text",
        variant: "static",
        required: false,
    },
    signature: {
        name: "signature",
        value: "",
        label: "Digital Signature",
        type: "text",
        variant: "static",
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