import React from 'react';
import InventoriesTable from './InventoriesTable';

const InventoriesTableWrapper = (props) => {
  const { isLoading, inventoryColumns, inventoryData } = props;
  return (
    <InventoriesTable
      isLoading={isLoading}
      columns={inventoryColumns}
      data={inventoryData}
    />
  );
};

export default InventoriesTableWrapper;
