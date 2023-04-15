import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BaseTable, {
  AutoResizer,
  Column,
  SortOrder, // do not remove
} from 'react-base-table'
import 'react-base-table/styles.css'

const defaultSort = {
  key: "name",
  order: SortOrder.ASC,
};

const MaintenanceRequests = (props) => {

  const {
    maintenanceRequests,
    onlySmallScreen,
    smallScreenSx,
    regularAndHigherScreenSx,
  } = props;

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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        Sorry, no matching records found.
      </Box>
    )
  };

  const columns = [
    { key: 'id', title: 'ID', width: 100 },
    { key: 'description', title: 'Description', width: 300 },
    { key: 'status', title: 'Status', width: 150 },
    { key: 'submitted', title: 'Submitted', width: 150 },
    { key: 'action', title: 'Action', width: 150 }
  ];

  useEffect(() => {
    setData(maintenanceRequests);
  }, [maintenanceRequests]);

  return (
    <Box sx={onlySmallScreen ? smallScreenSx : regularAndHigherScreenSx}>
      <Typography variant='h5'>Maintenance Requests</Typography>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            columns={columns}
            data={data}
            width={width}
            height={height}
            sortBy={sortBy}
            onColumnSort={onColumnSort}
            emptyRenderer={emptyRenderer}
          />
        )}
      </AutoResizer>
    </Box>
  );
};

export default MaintenanceRequests;
