import CategoryListDetails from '../../Components/CategoryDetails/CategoryListDetails';
import Collection from '../../Components/Collection/Collection';
import InventoryListDetails from './InventoryListDetails';
import InventoryOverview from './InventoryOverview';

const Inventories = ({ displayAllInventories, plainView }) => {
  return (
    <>
      {displayAllInventories ? <CategoryListDetails /> : <InventoryOverview />}
      <InventoryListDetails displayAllInventories={displayAllInventories} plainView={plainView} />
      {!displayAllInventories ? <Collection title="Learn more" /> : null}
    </>
  );
};

export default Inventories;
