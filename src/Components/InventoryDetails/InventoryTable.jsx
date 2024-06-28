import dayjs from 'dayjs';
import {
  Checkbox,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { CheckRounded, CircleRounded, CloseRounded, EditRounded, FileOpenRounded } from '@mui/icons-material';

/**
 * InventoryTable React Function - Displays the inventory table
 * @param {boolean} plainView - determines if extra functionality should be present, like selection of rows, defaults: false
 * @param {boolean} isLoading - determines if the selected data is still in loading state
 * @param {boolean} isCategory - determines if the view mode is from the category side instead of maintenance plan side. default: false
 * @param {Array<Object>} columns - the columns to display for the table
 * @param {Array<Object>} data - the data to display for each row in the table
 * @param {Array<String>} rowSelected - the array of IDs that represent each item
 * @param {Array<Object>} onRowSelect - the array of inventory items that is selected
 * @param {Function} handleRowSelection - the function that is used to handle selection of rows
 * @param {Function} handleEdit - the function that is used to handle editing capabilities
 */
const InventoryTable = ({
  plainView = false,
  isLoading,
  isCategory = false,
  columns,
  data,
  rowSelected,
  onRowSelect,
  handleRowSelection,
  handleEdit,
}) => {

  const generateTitleColor = (row, isCategory) => {
    let title = null;
    let color = null;
    if (isCategory) {
      title = row?.category_item.length > 0 && `Assigned ${row?.category_item[0].category_name} Category`;
      color = row?.category_item.length > 0 && row?.category_item[0].associated_color;
    } else {
      title = row?.maintenance_item.length > 0 && `Assigned ${row?.maintenance_item[0].maintenance_plan_name} Maintenance Plan`;
      color = row?.maintenance_item.length > 0 && row?.maintenance_item[0].associated_color;
    }
    return { title, color };
  };

  const rowFormatter = (row, column, color) => {
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
    if (['name'].includes(column)) {
      return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
          <CircleRounded sx={{ height: '0.75rem', width: '0.75rem', color: color ? `${color}` : 'transparent' }} />
          <Typography>{row[column] || '-'}</Typography>
        </Stack>
      );
    }
    return row[column] ?? '-';
  };

  if (isLoading) return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;

  if (!data || data.length === 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {!plainView ? (
              <TableCell padding="checkbox" align="center">
                <Stack direction="row" alignItems="center">
                  <Checkbox size="small" onClick={(ev) => handleRowSelection(ev, 'all')} />
                  <Typography fontWeight="bold" align="center">
                    Action
                  </Typography>
                </Stack>
              </TableCell>
            ) : null}
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id} align="center">
                  <Typography fontWeight="bold">{column.label}</Typography>
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
            const { title, color } = generateTitleColor(row, isCategory);
            return (
              <Tooltip key={rowIndex} title={title}>
                <TableRow hover>
                  {!plainView ? (
                    <TableCell padding="checkbox" align="center">
                      <Stack direction="row" alignItems="center">
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          size="small"
                          onClick={(event) => handleRowSelection(event, selectedID)}
                          inputProps={{ 'aria-labelledby': 'labelId' }}
                        />
                        <IconButton onClick={() => handleEdit(selectedID)} size="small">
                          <EditRounded color="primary" fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => onRowSelect(row)}>
                          <FileOpenRounded color="primary" fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  ) : null}
                  {Object.keys(columns).map((colKey) => {
                    const column = columns[colKey];
                    return (
                      <TableCell key={column.id} align="center" sx={{ width: '2rem' }}>
                        {rowFormatter(row, column.colName, color)}
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
