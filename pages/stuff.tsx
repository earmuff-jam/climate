import { Box, Typography } from "@mui/material";
import BasicBreadcrumbs from "../components/BreadCrumbs/BreadCrumbs";
import DataTable from "../components/DataTable/DataTable";

const Stuff = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "1rem",
        height: "100%",
      }}
    >
      <Box>
        <Typography variant="h4">Stuff</Typography>
        <BasicBreadcrumbs />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <DataTable
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 70,
              createDefaultValue: (i: any, j: any) : string => [i, j].join(),
            },
            {
              field: "name",
              headerName: "Name",
              width: 130,
              resizable: true,
              flex: 1,
              createDefaultValue: (i: any, j: any) : string => [i, j].join(),
            },
            {
              field: "description",
              headerName: "Description",
              width: 130,
              suppressSizeToFit: true,
              createDefaultValue: (i: any, j: any) : string => [i, j].join(),
            },
            {
              field: "price",
              headerName: "Price",
              width: 130,
              createDefaultValue: (i: any, j: any) : string => [i, j].join(),
            },
            {
              field: "quantity",
              headerName: "Quantity",
              width: 130,
              createDefaultValue: (i: any, j: any) : string => [i, j].join(),
            },
          ]}
        />
      </Box>
    </Box>
  );
};
export default Stuff;
