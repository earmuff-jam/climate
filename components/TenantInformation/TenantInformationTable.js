import BaseTable, {
  AutoResizer,
  Column,
  SortOrder, // do not remove
} from "react-base-table";
import "react-base-table/styles.css";
import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DEFAULT_TENANT_INFORMATION_TABLE_COLUMNS } from "./constants";
const defaultSort = {
  key: "name",
  order: SortOrder.ASC,
};

const TenantInformationTable = ({ datasets }) => {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    setData(datasets);
  }, []);
  return (
    <>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            columns={DEFAULT_TENANT_INFORMATION_TABLE_COLUMNS}
            data={data}
            width={width}
            height={height}
            sortBy={sortBy}
            onColumnSort={onColumnSort}
            emptyRenderer={emptyRenderer}
          />
        )}
      </AutoResizer>
    </>
  );
};

export default TenantInformationTable;
