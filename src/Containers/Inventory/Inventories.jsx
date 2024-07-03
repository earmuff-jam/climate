import CategoryListDetails from '../../Components/CategoryDetails/CategoryListDetails';
import Collection from '../../Components/Collection/Collection';
import InventoryListDetails from './InventoryListDetails';
import InventoryOverview from './InventoryOverview';

const Inventories = ({ displayAllInventories, hideActionMenu }) => {
  return (
    <>
      {displayAllInventories ? <CategoryListDetails /> : <InventoryOverview />}
      <InventoryListDetails displayAllInventories={displayAllInventories} hideActionMenu={hideActionMenu} />
      {!displayAllInventories ? <Collection title="Learn more" /> : null}
    </>
  );
};

export default Inventories;
