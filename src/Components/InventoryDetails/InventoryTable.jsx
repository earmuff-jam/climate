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
import { CheckRounded, CloseRounded, EditNoteRounded, FileOpenRounded } from '@mui/icons-material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';

const InventoryTable = ({ isLoading, columns, data, rowSelected, onRowSelect, handleRowSelection, handleEdit }) => {
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
    if (['is_returnable'].includes(column)) {
      return row[column] ? <CheckRounded color="primary" /> : <CloseRounded color="error" />;
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
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Checkbox disabled size="small" />
                <Typography fontWeight={'bold'} align="center">
                  Action
                </Typography>
              </Stack>
            </TableCell>
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id} align="center">
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
                  <TableCell padding="checkbox" align="center">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Checkbox
                        checked={isItemSelected}
                        color="primary"
                        size="small"
                        onClick={(event) => handleRowSelection(event, selectedID)}
                        inputProps={{ 'aria-labelledby': 'labelId' }}
                      />
                      <IconButton size="small" onClick={() => onRowSelect(row)}>
                        <FileOpenRounded color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(selectedID)}>
                        <EditNoteRounded color="primary" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  {Object.keys(columns).map((colKey) => {
                    const column = columns[colKey];
                    return (
                      <TableCell key={column.id} align="center">
                        {rowFormatter(row, column.colName)}
                      </TableCell>
                    );
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
