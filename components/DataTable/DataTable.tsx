import React, { useState, useMemo, useRef, useCallback, memo } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
interface DataTableProps extends AgGridReactProps {
  rowData?: any[];
  columns?: any[];
}

const DataTable = ({
  rowData,
  columns,
}: DataTableProps) => {
  const gridRef = useRef();
  // some sample rowData





  // columnNames
  const [columnDefs] = useState(columns ?? [
    { field: "id", headerName: "ID", width: 70, },
    { field: "name", headerName: "Name", width: 130,  resizable: true, flex: 1 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
  ]);

  const wat = useMemo(() => [...new Array(10000)].map((_, i) => [...columnDefs.map((c, j) => {
    return { [c.field]: c.createDefaultValue?.(i, j) };
  })].reduce((a, b) => ({ ...a, ...b }), {})), [columnDefs]);
 
  const [rowDataState] = useState(rowData ?? wat);

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
      sx={{
        minHeight: "20rem",
        minWidth: "20rem",
        height: "100%",
      }}
    >
      <AgGridReact
        className="ag-theme-alpine"
        ref={gridRef}
        rowData={rowDataState}
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
