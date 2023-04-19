import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
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

const PaymentHistory = ({ payments }) => {

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
    { key: 'date', title: 'Date', width: 150 },
    { key: 'amount', title: 'Amount', width: 150 },
    { key: 'status', title: 'Status', width: 150 },
    { key: 'lateFee', title: 'Late Fee', width: 150 },
    { key: 'balance', title: 'Balance', width: 150 },
  ];

  const cellRenderer = ({ cellData }) => <Typography>{cellData}</Typography>;

  useEffect(() => {
    setData(payments);
  }, []);

  return (
    <Box>
      <Typography variant='h5'>Payment History</Typography>
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
            cellRenderer={cellRenderer}
          />
        )}
      </AutoResizer>
    </Box>
  );
};

export default PaymentHistory;
