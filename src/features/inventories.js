import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { validate } from 'uuid';

// static query options for tanstack query
const useQueryOptions = {
  refetchOnWindowFocus: false,
};

/***************************
 * FETCH INVENTORY DETAILS *
 ***************************/

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
      maintenance_item (
        maintenance_plan_name,
        overflow,
        associated_color
      ),
      creator_name:profiles!created_by(
        username
      ),
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
    useQueryOptions,
  });
};

/********************************
 * INSERT BULK INVENTORY ITEM *
 ********************************/

// loop fn to update all inventories one at a time
const upsertInventoryDetailsInBulk = async (client, userID, data) => {
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((element) => {
      upsertInventoryDetails(client, userID, {
        ...element,
        location: {
          location: element.location,
        },
        created_by: userID,
        created_on: dayjs(),
      });
    });
  }
};

// upsert inventory details mutation fn
export const useUpsertInventoryDetailsInBulk = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertInventoryDetailsInBulk(supabaseClient, user.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventoryList']);
    },
  });
};

/********************************
 * INSERT SINGLE INVENTORY ITEM *
 ********************************/

/**
 * upsert inventory data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the inventory details to create
 * @returns
 */
const upsertInventoryDetails = async (client, userID, data) => {
  // remove id, so the application can generate itself
  const { id, price, quantity, location, ...inventoryData } = data;
  const storageLocationID = upsertStorageLocationForSelectInventory(client, userID, location);

  let createdByUUID = '';
  if (validate(userID)) {
    createdByUUID = userID;
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
};

// upsert inventory details mutation fn
export const useUpsertInventoryDetails = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertInventoryDetails(supabaseClient, user.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventoryList']);
    },
  });
};

/********************************
 * UPDATE SINGLE INVENTORY ITEM *
 ********************************/

/**
 * Method to update the selected inventory
 *
 * @param {Object} client - supabaseClient
 * @param {UUID} inventoryID - the inventory id of the selected item
 * @param {Object} data - the data to update
 */
const updateSelectedInventory = (client, inventoryID, data) => {
  return client.from('inventories').update(data).eq('id', inventoryID);
};

// update selected inventory from db
export const useUpdateSelectedInventory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => updateSelectedInventory(supabaseClient, data.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventoryList']);
    },
  });
};

/********************************
 * DELETE SINGLE INVENTORY ITEM *
 ********************************/

/**
 * Method to delete the selected inventories
 * @param {Object} supabaseClient
 * @param {String} inventoryIDs - the inventory ID to delete
 */
const deleteInventoryDetails = (client, inventoryIDs) => {
  return client.from('inventories').delete().in('id', inventoryIDs);
};

// delete selected inventories from db
export const useDeleteSelectedInventory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((ids) => deleteInventoryDetails(supabaseClient, ids), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inventoryList']);
    },
  });
};

// method that attempts to create / use existing storage location if found
const upsertStorageLocationForSelectInventory = async (client, userID, location) => {
  let storageLocationID = '';
  const { data: storageLocationDetails, error: storageLocationDetailsError } = await client
    .from('storage_locations')
    .select('id, location')
    .eq('location', location.location);

  if (storageLocationDetailsError) {
    throw storageLocationDetailsError;
  }

  let createdByUUID = '';
  if (validate(userID)) {
    createdByUUID = userID;
  }

  // if no existing storage location is found, create a new storage location
  if (storageLocationDetails.length <= 0) {
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
  return storageLocationID;
};
