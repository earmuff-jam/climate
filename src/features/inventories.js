import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';
import { validate } from 'uuid';

const fetchInventories = (client, userID) => {
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
    .eq('created_by', userID)
    .order('updated_on', { ascending: false });
};

/**
 * retrieves a list of inventory items created by the user
 */
export const useFetchInventories = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const result = await fetchInventories(supabaseClient, user.id);
    return result.data;
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'inventories',
  });
};

const createInventories = async (client, userID, data) => {
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((element) => {
      createInventoryItem(client, userID, {
        ...element,
        location: {
          location: element.location,
        },
        created_by: userID,
        created_on: dayjs().toISOString(),
      });
    });
  }
};

/**
 * creates inventories in bulk. also creates torage location for each inventory item
 * if they are not found
 */
export const useCreateInventories = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => createInventories(supabaseClient, user.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('inventories');
    },
  });
};

const createInventoryItem = async (client, userID, data) => {
  // remove id, so the application can generate itself
  const { price, quantity, location, ...inventoryData } = data;
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

/**
 * create single inventory item for the selected user
 * also creates a new storage location if the selected inventory item
 * requires one
 */
export const useCreateInventoryItem = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => createInventoryItem(supabaseClient, user.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('inventories');
    },
  });
};

const updateInventory = (client, inventoryID, userID, data) => {
  return client.from('inventories').update(data).eq('id', inventoryID).eq('created_by', userID);
};

/**
 * updates a selected inventory that is created by the selected user
 */
export const useUpdateInventory = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => updateInventory(supabaseClient, data.id, user.id, data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries('inventories');
      const prev = queryClient.getQueryData('inventories');
      queryClient.setQueryData('inventories', (old) => {
        const newer = old.map((item) => (item.id === data.id ? { ...item, ...data } : item));
        return newer;
      });
      return { prev };
    },
    onSettled: () => {
      queryClient.invalidateQueries('inventories');
    },
  });
};

const deleteInventories = (client, inventoryIDs) => {
  return client.from('inventories').delete().in('id', inventoryIDs);
};

/**
 * deletes all selected inventories
 */
export const useDeleteInventories = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((ids) => deleteInventories(supabaseClient, ids), {
    onSuccess: () => {
      queryClient.invalidateQueries('inventories');
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
