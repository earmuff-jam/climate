import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import "react-base-table/styles.css";
import { v4 as uuid } from "uuid";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import BaseTable, {
  AutoResizer,
  SortOrder, // do not remove
} from "react-base-table";
import {
  AddCircleOutlineRounded,
  DeleteForeverRounded,
  EditRounded,
} from "@mui/icons-material";

const GlobalStyle = createGlobalStyle`
  .BaseTable.active-col-0 [data-col-idx="0"],
  .BaseTable.active-col-1 [data-col-idx="1"],
  .BaseTable.active-col-2 [data-col-idx="2"],
  .BaseTable.active-col-3 [data-col-idx="3"],
  .BaseTable.active-col-4 [data-col-idx="4"],
  .BaseTable.active-col-5 [data-col-idx="5"],
  .BaseTable.active-col-6 [data-col-idx="6"],
  .BaseTable.active-col-7 [data-col-idx="7"],
  .BaseTable.active-col-8 [data-col-idx="8"],
  .BaseTable.active-col-9 [data-col-idx="9"] {
    background: #f3f3f3;
  }
`;
const defaultSort = {
  key: "name",
  order: SortOrder.ASC,
};

const tableRef = React.createRef();

const MaintenanceRequests = (props) => {
  const { maintenanceRequests } = props;

  const [data, setData] = useState([]);
  const [addingRow, setAddingRow] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  const deleteRow = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setDeletingRow(null);
  };

  const addRow = (row) => {
    setData([...data, { ...row, id: uuid() }]);
    setAddingRow(false);
  };

  const updateRow = (row) => {
    const updatedData = data.map((item) => {
      if (item.id === row.id) {
        return row;
      }
      return item;
    });
    setData(updatedData);
    setEditingRow(null);
  };

  const cancelEdit = () => {
    setEditingRow(null);
  };
  const cancelAdd = () => {
    setAddingRow(false);
  };
  const cancelDelete = () => {
    setDeletingRow(null);
  };
  const [sortBy, setSortBy] = useState(defaultSort);
  const onColumnSort = (sortBy) => {
    const order = sortBy.order === SortOrder.ASC ? 1 : -1;
    const data = [...datasets];
    data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
    setData(data);
    setSortBy(sortBy);
  };

  const emptyRenderer = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        Sorry, no matching records found.
      </Box>
    );
  };

  const columns = [
    { key: "id", dataKey: "id", title: "ID", width: "2.5rem" },
    { key: "property", dataKey: "property", title: "Property", width: "10rem" },
    { key: "issue", dataKey: "issue", title: "Issue", width: "10rem" },
    { key: "status", dataKey: "status", title: "Status", width: "10rem" },
    {
      key: "submittedDate",
      dataKey: "submittedDate",
      title: "Submitted",
      width: "10rem",
    },
    {
      key: "action",
      dataKey: "action",
      title: "Action",
      width: "10rem",
      frozen: "right",
      cellRenderer: ({ rowData, rowIndex }) => (
        <>
          <IconButton
            variant="outlined"
            color="primary"
            onClick={() => setEditingRow(rowData)}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            variant="outlined"
            color="error"
            onClick={() => setDeletingRow(rowData.id)}
          >
            <DeleteForeverRounded />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    setData(maintenanceRequests);
  }, [maintenanceRequests]);
  const cellProps = React.useCallback(
    ({ columnIndex }) => ({
      "data-col-idx": columnIndex,
      onMouseEnter: () => {
        const table = tableRef.current?.getDOMNode?.();
        if (table) {
          table.classList.add(`active-col-${columnIndex}`);
        }
      },
      onMouseLeave: () => {
        const table = tableRef.current?.getDOMNode?.();
        if (table) {
          table.classList.remove(`active-col-${columnIndex}`);
        }
      },
    }),
    []
  );
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexGrow: 1,
      }}
    >
      <AutoResizer>
        {({ width, height }) => (
          <>
            <GlobalStyle />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: width,
              }}
            >
              <Typography variant="h5">Maintenance Requests</Typography>
              <IconButton onClick={() => setAddingRow(true)}>
                <AddCircleOutlineRounded />
              </IconButton>
            </Box>
            <BaseTable
              ref={tableRef}
              width={width}
              height={height}
              columns={columns}
              data={data}
              sortBy={sortBy}
              cellProps={cellProps}
              onColumnSort={onColumnSort}
              emptyRenderer={emptyRenderer}
            />
            <AddRowModal
              // pass addRow and cancelEdit as props to the modal
              addRow={addRow}
              updateRow={updateRow}
              deleteRow={deleteRow}
              deletingRow={deletingRow}
              addingRow={addingRow}
              editingRow={editingRow}
              cancelAdd={cancelAdd}
              cancelEdit={cancelEdit}
              cancelDelete={cancelDelete}
            />
          </>
        )}
      </AutoResizer>
    </Box>
  );
};

function AddRowModal({
  addRow,
  updateRow,
  addingRow,
  editingRow,
  cancelAdd,
  cancelEdit,
  cancelDelete,
  deleteRow,
  deletingRow,
}) {
  const defaultValues = {
    property: "",
    issue: "",
    status: "",
    submittedDate: "",
  };
  const [newRow, setNewRow] = useState(() => {
    if (deletingRow) {
      return {};
    }
    if (addingRow) {
      return { id: Math.random(), ...defaultValues };
    }

    if (editingRow) {
      return { ...editingRow };
    }
  });

  const handleSave = () => {
    if (addingRow) {
      addRow(newRow);
    } else if (editingRow) {
      updateRow(newRow);
    } else if (deletingRow) {
      deleteRow(deletingRow);
    }
  };

  const handleCancel = () => {
    if (addingRow) {
      cancelAdd(newRow);
    } else if (editingRow) {
      cancelEdit(newRow);
    } else if (deletingRow) {
      cancelDelete(deletingRow);
    }
  };
  return (
    <Dialog
      open={addingRow || editingRow || deletingRow}
      onClose={handleCancel}
    >
      <DialogTitle>{`${addingRow ? "Add" : "Edit"} Row`}</DialogTitle>
      <DialogContent>
        {deletingRow && (
          <Typography>Are you sure you want to delete this row?</Typography>
        )}
        {(addingRow || editingRow) && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Issue"
              type="text"
              fullWidth
              value={newRow.issue}
              onChange={(e) => setNewRow({ ...newRow, issue: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Property"
              type="text"
              fullWidth
              value={newRow.property}
              onChange={(e) =>
                setNewRow({ ...newRow, property: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Status"
              type="text"
              fullWidth
              value={newRow.status}
              onChange={(e) => setNewRow({ ...newRow, status: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Submitted Date"
              type="date"
              fullWidth
              value={newRow.submittedDate}
              onChange={(e) =>
                setNewRow({ ...newRow, submittedDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Tenant"
              type="text"
              fullWidth
              value={newRow.tenant}
              onChange={(e) => setNewRow({ ...newRow, tenant: e.target.value })}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MaintenanceRequests;
