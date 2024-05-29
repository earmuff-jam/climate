import { useMutation, useQuery } from 'react-query';
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
      created_at,
      created_by,
      updated_at,
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
    queryKey: ['inventoryList', user.id],
  });
};

/**
 * upsert inventory data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the inventory details to create
 * @returns
 */
const upsertInventoryDetails = (client, data) => {
  return client.from('inventories').upsert(data).select();
};

// upsert inventory details mutation fn
export const useUpsertInventoryDetials = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertInventoryDetails(supabaseClient, data));
};

/**
 *
 * @param {Object} supabaseClient
 * @param {String} inventoryID - the inventory ID to delete
 * @returns
 */
const deleteInventoryDetails = (client, inventoryID) => {
  return client.from('inventories').delete().eq('id', inventoryID);
};

// delete selected inventory from db
export const useDeleteSelectedInventory = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteInventoryDetails(supabaseClient, id));
};
