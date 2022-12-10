import React, { useState, useMemo, useRef, useCallback } from "react";
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
  const cellClickedListener = useCallback((e) => {
    console.log("cellClicked", e);
  }, []);
  return (
    <Box
      className="ag-theme-alpine"
      height="40rem"
    >
      <AgGridReact
        className="ag-theme-alpine"
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColumnDefs}
        animateRows={true}
        rowSelection="multiple"
        onCellClicked={cellClickedListener}
      />
    </Box>
  );
};

export default DataTable;