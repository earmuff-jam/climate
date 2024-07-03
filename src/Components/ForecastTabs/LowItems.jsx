import { Stack, Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import TableComponent from '../InventoryDetails/TableComponent';
import { useFetchLowThresholdItemsWithCategory } from '../../features/categories';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryDetails/constants';
import { generateTitleColor } from '../../util/util';
import { CircleRounded } from '@mui/icons-material';
import dayjs from 'dayjs';


const LowItems = () => {
  const { data } = useFetchLowThresholdItemsWithCategory();

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
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={{ xs: 1 }}>
          <CircleRounded sx={{ height: '0.75rem', width: '0.75rem', color: color ? `${color}` : 'transparent' }} />
          <Typography variant="subtitle2">{row[column] || '-'}</Typography>
        </Stack>
      );
    }
    return row[column] ?? '-';
  };

  return (
    <Stack>
      <HeaderWithButton
        title="Low on stock"
        titleVariant="h6"
        secondaryTitle="View list of all the items that are equal or below the threshold set in categories"
      />
      <TableComponent
        hideActionMenu
        isCategory
        override // overrides the action button
        supportLowStock
        isLoading={false}
        rowFormatter={rowFormatter}
        generateTitleColor={generateTitleColor}
        data={data?.map((v) => v.inventories) || []}
        rowSelected={[]}
        columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
      />
    </Stack>
  );
};

export default LowItems;
