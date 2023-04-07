export const maintenanceRequests = [
    {
      id: 1,
      property: "123 Main St.",
      tenant: "John Smith",
      issue: "Leaky faucet",
      status: "Open",
      submittedDate: "2023-04-01",
      actions: ""
    },
    {
      id: 2,
      property: "456 Elm St.",
      tenant: "Jane Doe",
      issue: "Broken doorknob",
      status: "Open",
      submittedDate: "2023-03-30",
      actions: ""
    },
    {
      id: 3,
      property: "789 Oak St.",
      tenant: "Bob Johnson",
      issue: "Clogged drain",
      status: "In Progress",
      submittedDate: "2023-03-28",
      actions: "Plumber scheduled for 4/10"
    },
    {
      id: 4,
      property: "456 Elm St.",
      tenant: "Jane Doe",
      issue: "Heater not working",
      status: "Resolved",
      submittedDate: "2023-03-25",
      actions: "Heater repaired on 3/28"
    }
  ];
  
export const payments = [
  {
    id: 1,
    tenant: "John Smith",
    paymentAmount: 1000,
    paymentDate: "2022-03-01",
    lateFee: 0,
    status: "Paid"
  },
  {
    id: 2,
    tenant: "Jane Doe",
    paymentAmount: 950,
    paymentDate: "2022-03-01",
    lateFee: 50,
    status: "Paid"
  },
  {
    id: 3,
    tenant: "Bob Johnson",
    paymentAmount: 1000,
    paymentDate: "2022-02-01",
    lateFee: 0,
    status: "Paid"
  },
  {
    id: 4,
    tenant: "Sarah Lee",
    paymentAmount: 1000,
    paymentDate: "2022-01-01",
    lateFee: 100,
    status: "Paid"
  },
  {
    id: 5,
    tenant: "Mike Jones",
    paymentAmount: 1000,
    paymentDate: "2021-12-01",
    lateFee: 0,
    status: "Paid"
  },
  {
    id: 6,
    tenant: "Tommy Lee",
    paymentAmount: 1050,
    paymentDate: "2021-11-01",
    lateFee: 0,
    status: "Paid"
  }
];