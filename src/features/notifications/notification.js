import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// supabase fn to retrieve list of inventories for a selected user
const fetchInventoriesList = (client, userID) => {
  return client
    .from('inventories')
    .select(
      `
      id,
      name,
      description,
      price,
      barcode,
      sku,
      quantity,
      bought_at,
      location,
      storage_location_id,
      is_bookmarked,
      is_returnable,
      return_location,
      max_weight,
      min_weight,
      max_height,
      min_height,
      created_on,
      created_by,
      updated_on,
      updated_by,
      sharable_groups
          `
    )
    .eq('created_by', userID);
};

// fn used to fetch all inventories for a selected user
export const useFetchInventoriesList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchInventoriesList(supabaseClient, user.id).then(
      (result) => result.data
    );
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['inventoriesList', user.id],
  });
};
