import { styled } from "@mui/material";

const DEFAULT_FEATURES_TABLE = {
  resizable: true,
  sortable: true,
  editable: true,
};

export const REGULAR_AND_UP_SZ_SX = {
  width: "44rem",
  height: "30vh",
  marginBottom: "2rem",
};
export const SMALL_SZ_SX = { width: "44rem", height: "30vh" };

const TypographyStyled = styled("div")({
  fontSize: "0.7rem",
});

export const DEFAULT_LEASE_INFORMATION_TABLE_CONSTANTS = [
  {
    key: "tenant_id",
    title: "ID",
    width: 200,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.tenant_id}</TypographyStyled>
    ),
  },
  {
    key: "property_id",
    title: "Property under lease",
    width: 200,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>property id</TypographyStyled>
    ),
  },
  {
    key: "firstname",
    title: "First Name",
    width: 100,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.firstname}</TypographyStyled>
    ),
  },
  {
    key: "lastname",
    title: "Last Name",
    width: 100,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.lastname}</TypographyStyled>
    ),
  },
  {
    key: "occupation",
    title: "Occupation",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.occupation}</TypographyStyled>
    ),
  },
  {
    key: "moveindate",
    title: "Move in Date",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.moveindate}</TypographyStyled>
    ),
  },
  {
    key: "amount",
    title: "Rent Amount",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.rentamount}</TypographyStyled>
    ),
  },
  {
    key: "monthlyincome",
    title: "Monthly Income",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.monthlyincome}</TypographyStyled>
    ),
  },
  {
    key: "securitydepositamount",
    title: "Security Deposit",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.securitydepositamount}</TypographyStyled>
    ),
  },
  {
    key: "petallowed",
    title: "Pets allowed",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.petallowed}</TypographyStyled>
    ),
  },
];
