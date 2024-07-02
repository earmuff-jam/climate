import { Stack } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import TableComponent from '../InventoryDetails/TableComponent';
import { useFetchLowThresholdItemsWithCategory } from '../../features/categories';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryDetails/constants';

const LowItems = () => {
  const { data } = useFetchLowThresholdItemsWithCategory();
  return (
    <Stack>
      <HeaderWithButton
        title="Low on stock"
        titleVariant="h6"
        secondaryTitle="View list of all the items that are equal or below the threshold set in categories"
      />
      <TableComponent
        plainView={true}
        isCategory={true}
        supportLowStock={true}
        isLoading={false}
        data={data?.map((v) => v.inventories) || []}
        rowSelected={[]}
        columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
      />
    </Stack>
  );
};

export default LowItems;
