import { Stack } from '@mui/material';
import PrivateLayout from '@/components/Auth/PrivateLayout';
import { useRouter } from 'next/router';
import InventoryList from '@/components/Inventories/InventoryList';

const InventoryItem = () => {
  const router = useRouter();
  const { id: inventoryID } = router.query;

  if (!inventoryID) return null;

  const displayDetails = (inventoryID) => {
    switch (inventoryID) {
      case 'list':
        return (
          /* View list of all inventory items */
          <InventoryList displayAllInventories={true} />
        );
      default:
        return <>Display property based on id - {inventoryID}</>;
    }
  };

  return <Stack>{displayDetails(inventoryID)}</Stack>;
};

export default InventoryItem;

InventoryItem.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
