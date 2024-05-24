import React from 'react';
import InventoryList from '@/components/Inventories/InventoryList';
import Collection from '@/components/Inventories/Collection';
import PrivateLayout from '@/components/Auth/PrivateLayout';

const Inventories = () => {
  return (
    <>
      <InventoryList />
      <Collection title={'Inventories'} displayInventories={true} />
      <Collection title={'Learn more'} displayInventories={false} />
    </>
  );
};

export default Inventories;

Inventories.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
