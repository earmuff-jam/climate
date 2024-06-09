import CategoryListDetails from '../../Components/CategoryDetails/CategoryListDetails';
import Collection from '../../Components/Collection/Collection';
import InventoryListDetails from './InventoryListDetails';

const Inventories = ({ displayAllInventories }) => {
  return (
    <>
      <CategoryListDetails />
      <InventoryListDetails displayAllInventories={displayAllInventories} />
      {!displayAllInventories ? <Collection title={'Learn more'} /> : null}
    </>
  );
};

export default Inventories;
