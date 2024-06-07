import React from 'react';
import CategoryList from '@/components/Categories/CategoryList';
import Collection from '@/components/Inventories/Collection';
import PrivateLayout from '@/components/Auth/PrivateLayout';
import InventoryList from '@/components/Inventories/InventoryList';

const Inventories = () => {
  return (
    <>
      <CategoryList />
      {/* Main inventory page - displays bookmarked inventories */}
      <InventoryList displayAllInventories={false} />
      <Collection title={'Learn more'} />
    </>
  );
};

export default Inventories;

Inventories.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
