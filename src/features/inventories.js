import { useMutation, useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';

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
      is_bookmarked,
      is_returnable,
      return_location,
      return_datetime,
      max_weight,
      min_weight,
      max_height,
      min_height,
      created_on,
      created_by,
      updated_on,
      updated_by,
      sharable_groups,
      storage_locations (id)
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
const upsertInventoryDetails = async (client, data) => {
  const { storage_location, ...inventoryData } = data;

  try {
    let storageLocationId = inventoryData.storage_location_id;

    // Upsert storage location if provided
    // if there is no storage location ID, then that is a new location
    if (!storageLocationId) {
      const { data: storageLocationData, error: storageLocationError } =
        await client
          .from('storage_locations')
          .upsert({
            location: storage_location,
            created_by: user.id,
            created_at: dayjs(),
            sharable_groups: [user.id],
          })
          .select();

      if (storageLocationError) throw storageLocationError;

      // Assuming the storage location has a unique identifier 'id'
      storageLocationId = storageLocationData[0].id;
    }

    // Set the storage_location_id in the inventory data
    inventoryData.storage_location_id = storageLocationId;

    // Upsert inventory details
    const { data: inventoryDataResult, error: inventoryError } = await client
      .from('inventories')
      .upsert(inventoryData)
      .select();

    if (inventoryError) throw inventoryError;

    return { data: inventoryDataResult, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// upsert inventory details mutation fn
export const useUpsertInventoryDetails = () => {
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
