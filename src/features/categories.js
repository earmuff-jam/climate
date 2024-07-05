import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';

const fetchCategories = (client, userID) => {
  return client
    .from('category')
    .select(
      `
        id,
        category_name,
        category_description,
        is_deleteable,
        created_on,
        created_by,
        updated_on,
        updated_by,
        sharable_groups,
        thresholdlimit,
        totalAssignedItems:category_item!id(
          id,
          item_id
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
    .order('category_name', { ascending: true });
};

/**
 * retrieve a list of categories for the selected user in array format.
 * includes total assigned items for categories as an array and creator name and
 * updator name.
 */
export const useFetchCategories = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchCategories(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'categories',
  });
};

const fetchCategoryItems = (client, userID) => {
  return client.from('category_item').select(`id`).eq('created_by', userID);
};

/**
 * retrives a list of items that are belong to at least one category
 * that are created by the selected user.
 */
export const useFetchCategoryItems = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    return fetchCategoryItems(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'category_items',
  });
};

const fetchItemWithCategoryDetails = (client, userID) => {
  return client
    .from('category_item')
    .select(
      `
        id,
        item_id,
        comments,
        category(
          id,
          category_name,
          color,
          thresholdlimit
        ),
        inventories(
          name,
          description,
          location,
          price,
          quantity,
          updated_on,
          updator_name:profiles!updated_by(
            username
          )
        )
      `
    )
    .eq('created_by', userID);
};

/**
 * retrieves a list of items that belong to at least one category and
 * the category details and item details for that selected item that is
 * created by the selected user.
 */
export const useFetchItemWithCategoryDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchItemWithCategoryDetails(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'low_threshold_items_with_categories',
  });
};

/**
 * retrieves the list of inventory items for each category that is passed in
 * also retrieves the category details for that selected category the item belongs in
 * created by the selected user
 */
export const fetchInvItemsForCategory = (client, userID, catID) => {
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
      category_item!inner (
        category_id,
        category_name,
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
    .eq('category_item.category_id', catID)
    .eq('created_by', userID);
};

const createCategory = (client, data) => {
  return client.from('category').upsert(data);
};

/**
 * create category for a select user
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => createCategory(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

const updateCategoryThreshold = (client, thresholdLimit, categoryID) => {
  return client.from('category').update({ thresholdlimit: thresholdLimit }).eq('id', categoryID);
};

/**
 * updates category threshold limit for a selected category created by the user
 */
export const useUpdateCategoryThreshold = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ thresholdLimit, categoryID }) => updateCategoryThreshold(supabaseClient, thresholdLimit, categoryID),
    {
      onMutate: async ({ thresholdLimit, categoryID }) => {
        await queryClient.cancelQueries(['categories']);
        const prev = queryClient.getQueryData('categories');
        queryClient.setQueryData('categories', (old) => {
          return old.map((category) =>
            category.id === categoryID ? { ...category, thresholdlimit: thresholdLimit } : category
          );
        });
        return { prev };
      },
    }
  );
};

const deleteCategory = (client, categoryID) => {
  return client.from('category').delete().eq('id', categoryID);
};

/**
 * delete selected category that is created by the selected user
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteCategory(supabaseClient, id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('categories');
      const prev = queryClient.getQueryData('categories');
      queryClient.setQueryData('categories', (old) => old.filter((v) => v.id != id));
      return { prev };
    },
  });
};

const removeItemFromCategory = (client, id) => {
  return client.from('category_item').delete().eq('item_id', id);
};

/**
 * remove item from selected category created by the selected user
 */
export const useRemoveItemFromCategory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => removeItemFromCategory(supabaseClient, id), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

/**
 * Assign maintenance plan to selected inventory item
 * @param {Object} supabaseClient
 * @param {String} userID - the ID of the user making the request
 * @param {String} categoryID - the category ID to associate the inventory item against
 * @param {String} categoryName - the category name to associate the inventory item against
 * @param {Array<String>} selectedItemIDs - the IDs of the selected inventory items
 * @returns {Promise<Array>} - a promise that resolves when all upsert operations are complete
 */
const assignItemsToCategory = async (client, userID, categoryID, categoryName, selectedItemIDs) => {
  const promises = selectedItemIDs.map((element) => {
    return client
      .from('category_item')
      .upsert({
        category_id: categoryID,
        category_name: categoryName,
        item_id: element,
        created_on: dayjs(),
        created_by: userID,
        sharable_groups: [userID],
      })
      .select();
  });
  return Promise.all(promises);
};

/**
 * assign items to selected category created by the selected user
 */
export const useAssignItemsToCategory = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ categoryID, categoryName, selectedItemIDs }) =>
      assignItemsToCategory(supabaseClient, user?.id, categoryID, categoryName, selectedItemIDs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories', 'low_threshold_items_with_categories', 'inventoryList']);
      },
    }
  );
};
