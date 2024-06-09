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
  Typography,
} from '@mui/material';
import { FileOpenRounded } from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';

const InventoryTable = ({ isLoading, columns, data, rowSelected, onRowSelect, handleRowSelection }) => {
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
    return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  }

  if (!data || data.length === 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" align="center">
              <Stack direction="row">
                <Checkbox disabled size="small" />
              </Stack>
            </TableCell>
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id}>
                  <Typography fontWeight={'bold'}>{columnHeaderFormatter(column)}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => {
            const isSelected = (id) => rowSelected.indexOf(id) !== -1;
            const selectedID = row.id;
            const isItemSelected = isSelected(selectedID);
            return (
              <Tooltip key={rowIndex} title={row.description}>
                <TableRow hover>
                  <TableCell padding="checkbox">
                    <Stack direction="row">
                      <Checkbox
                        checked={isItemSelected}
                        color="primary"
                        size="small"
                        onClick={(event) => handleRowSelection(event, selectedID)}
                        inputProps={{ 'aria-labelledby': 'labelId' }}
                      />
                      <IconButton
                        size="small"
                        disableRipple={true}
                        disableFocusRipple={true}
                        onClick={() => onRowSelect(row)}
                      >
                        <FileOpenRounded color="primary" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  {Object.keys(columns).map((colKey) => {
                    const column = columns[colKey];
                    return <TableCell key={column.id}>{rowFormatter(row, column.colName)}</TableCell>;
                  })}
                </TableRow>
              </Tooltip>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
