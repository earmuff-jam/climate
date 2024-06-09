import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { validate } from 'uuid';

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
      storage_locations (id),
      updator_name:profiles!updated_by(
        username
      )
        `
    )
    .eq('created_by', userID);
};

// fn used to fetch all inventories for a selected user
export const useFetchInventoriesList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const result = await fetchInventoriesList(supabaseClient, user.id);
    const bookmarkedItems = result.data.filter((item) => item.is_bookmarked);
    return { result: result.data, bookmarkedItems };
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
const upsertInventoryDetails = async (client, userID, data) => {
  // remove id, so the application can generate itself
  const { id, price, quantity, location, ...inventoryData } = data;

  try {
    let storageLocationID = '';
    const { data: storageLocationDetails, error: storageLocationDetailsError } = await client
      .from('storage_locations')
      .select('id, location')
      .eq('location', location.location)
      .single();

    if (storageLocationDetailsError) {
      throw storageLocationDetailsError;
    }

    let createdByUUID = '';
    if (validate(userID)) {
      createdByUUID = userID;
    }

    if (!storageLocationDetails) {
      // Create a new storage location
      const { data: storageLocationData, error: storageLocationError } = await client
        .from('storage_locations')
        .insert({
          location: location.location,
          created_by: createdByUUID,
          created_on: dayjs().toISOString(),
          sharable_groups: [createdByUUID],
        })
        .select()
        .single();

      if (storageLocationError) throw storageLocationError;

      storageLocationID = storageLocationData.id;
    } else {
      // Existing storage location found
      storageLocationID = storageLocationDetails.id;
    }

    // Set the storage_location_id in the inventory data
    inventoryData.location = location.location;
    if (validate(storageLocationID)) {
      inventoryData.storage_location_id = storageLocationID;
    }

    if (price !== undefined) {
      inventoryData.price = parseFloat(price);
    }

    if (quantity !== undefined) {
      inventoryData.quantity = parseInt(quantity, 10);
    }

    inventoryData.updated_by = createdByUUID; // first time creator is updator
    inventoryData.updated_on = dayjs().toISOString();
    inventoryData.sharable_groups = [createdByUUID];

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
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertInventoryDetails(supabaseClient, user.id, data), {
    onSuccess: () => {
      // Invalidate the profile configuration query to refetch the data
      queryClient.invalidateQueries(['inventoryList']);
    },
  });
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
