import { RemoveRounded } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";

export const DEFAULT_FEATURES_TABLE = {
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

export const DEFAULT_TENANT_INFORMATION_TABLE_COLUMNS = [
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
    key: "tenant_type",
    title: "Type of Tenant",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => {
      const typeOfTenant =
        rowData?.tenant_type === "1" ? "lead" : "oppertunity";
      return (
        <Box
          sx={{
            pl: 1,
            borderLeft:
              typeOfTenant === "oppertunity"
                ? "2px solid green"
                : "2px solid blue",
          }}
        >
          <TypographyStyled>{typeOfTenant}</TypographyStyled>
        </Box>
      );
    },
  },
  {
    key: "firstname",
    title: "First Name",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.firstname}</TypographyStyled>
    ),
  },
  {
    key: "lastname",
    title: "Last Name",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.lastname}</TypographyStyled>
    ),
  },
  {
    key: "emergencycontactname",
    title: "Emergency Contact Name",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.emergencycontactname}</TypographyStyled>
    ),
  },
  {
    key: "emergencycontactphone",
    title: "Emergency Contact Phone",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.emergencycontactphone}</TypographyStyled>
    ),
  },
  {
    key: "moveindate",
    title: "Moved in",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.moveindate}</TypographyStyled>
    ),
  },
  {
    key: "leaseduration",
    title: "Lease Duration",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <TypographyStyled>{rowData?.leaseduration}</TypographyStyled>
    ),
  },
  {
    key: "action",
    title: "Action",
    width: 150,
    ...DEFAULT_FEATURES_TABLE,
    cellRenderer: ({ rowData }) => (
      <IconButton>
        <RemoveRounded />
      </IconButton>
    ),
  },
];
