import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const DataTable = () => {
  const gridRef = useRef();
  // some sample rowData
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  // columnNames
  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  // columnProperties
  const defaultColumnDefs = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  return (
    <Box
      className="ag-theme-alpine"
      sx={{
        height: "50rem",
        width: "100rem",
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColumnDefs}
        animateRows={true}
        rowSelection='multiple'
      />
    </Box>
  );
};

export default DataTable;
