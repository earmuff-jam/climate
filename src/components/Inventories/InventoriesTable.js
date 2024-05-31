import React from 'react';
import dayjs from 'dayjs';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  IconButton,
  Skeleton,
  Tooltip,
  Stack,
} from '@mui/material';
import { OpenInNewRounded } from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '@/util/util';

const InventoriesTable = ({ isLoading, columns, data, onRowSelect }) => {
  const columnHeaderFormatter = (column) => {
    return column.label;
  };

  const rowFormatter = (row, column) => {
    if (['created_on', 'updated_on'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    if (['price', 'quantity'].includes(column)) {
      return row[column] <= 0 ? '-' : row[column];
    }
    if (['updator_name', 'creator_name'].includes(column)) {
      return row[column]?.username ?? '-';
    }
    return row[column] ?? '-';
  };

  if (isLoading) {
    return (
      <Skeleton
        variant='rounded'
        animation='wave'
        height={'100%'}
        width={'100%'}
      />
    );
  }

  if (!data || data.length === 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox' align='center'>
              <Checkbox disabled />
            </TableCell>
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id}>
                  {columnHeaderFormatter(column)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <Tooltip key={rowIndex} title={row.description}>
              <TableRow hover>
                <TableCell padding='checkbox'>
                  <Stack direction='row'>
                    <Checkbox
                      disabled={true}
                      color='primary'
                      size='small'
                      inputProps={{ 'aria-labelledby': 'labelId' }}
                    />
                    <IconButton
                      size='small'
                      disableRipple={true}
                      disableFocusRipple={true}
                      onClick={() => onRowSelect(row)}
                    >
                      <OpenInNewRounded />
                    </IconButton>
                  </Stack>
                </TableCell>
                {Object.keys(columns).map((colKey) => {
                  const column = columns[colKey];
                  return (
                    <TableCell key={column.id}>
                      {rowFormatter(row, column.colName)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoriesTable;
