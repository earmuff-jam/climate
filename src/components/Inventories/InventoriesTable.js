import { DisplayNoMatchingRecordsComponent } from '@/util/util';

const { OpenInNewRounded } = require('@mui/icons-material');
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Box,
  IconButton,
  Skeleton,
} = require('@mui/material');

const InventoriesTable = ({ isLoading, columns, data }) => {
  const columnHeaderFormatter = (column) => {
    return column?.label;
  };

  const rowFormatter = () => {};

  const handleRowSelection = () => {};
  const handleDisplayMoreDetails = () => {};

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

  // empty rows displays no matching records text
  if (data === null || data === 'undefined' || data?.length === 0) {
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
            {columns?.map((column) => (
              <TableCell key={column}>
                {columnHeaderFormatter(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover key={0}>
            <TableCell padding='checkbox'>
              <Box>
                <Checkbox
                  disabled={true}
                  color='primary'
                  size='small'
                  onClick={(event) =>
                    !isItemDisabled
                      ? handleRowSelection(event, selectedID)
                      : null
                  }
                  inputProps={{ 'aria-labelledby': 'labelId' }}
                />
                <IconButton
                  size='small'
                  disableRipple={true}
                  disableFocusRipple={true}
                  disabled={false}
                  onClick={(event) =>
                    !isItemDisabled
                      ? handleDisplayMoreDetails(event, selectedID)
                      : null
                  }
                >
                  <OpenInNewRounded />
                </IconButton>
              </Box>
            </TableCell>
            {data?.map((row) => (
              <TableCell key={row}>{rowFormatter(row, rowIndex)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoriesTable;
