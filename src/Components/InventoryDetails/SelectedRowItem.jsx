import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { BUILD_TABLE_CONSTANTS } from './constants';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const SelectedRowItem = ({ selectedRow, columns }) => {
  if (Object.keys(selectedRow).length === 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <Table>
      <TableBody>
        {BUILD_TABLE_CONSTANTS(columns)(selectedRow).map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SelectedRowItem;
