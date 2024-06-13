import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';

// static query options for tanstack query
const useQueryOptions = {
  refetchOnWindowFocus: false,
};

// supabase fn to retrieve list of categories for a selected user
const fetchCategoriesList = (client, userID) => {
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
        totalAssignedItems:category_item!id(
          id
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

// fn used to fetch all categories for a selected user
export const useFetchCategoryList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchCategoriesList(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['categoryList', user.id],
    useQueryOptions,
  });
};

/**
 * upsert category data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the category details to create
 * @returns
 */
const upsertCategoryDetails = (client, data) => {
  return client.from('category').upsert(data).select();
};

// upsert category details mutation fn
export const useUpsertCategoryDetails = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertCategoryDetails(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['categoryList']);
    },
  });
};

/**
 *
 * @param {Object} supabaseClient
 * @param {String} categoryID - the category ID to delete
 * @returns
 */
const deleteCategoryDetails = (client, categoryID) => {
  return client.from('category').delete().eq('id', categoryID);
};

export const useDeleteSelectedCategory = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteCategoryDetails(supabaseClient, id), {
    onSuccess: () => {
      // Invalidate the profile configuration query to refetch the data
      queryClient.invalidateQueries(['categoryList']);
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
const assignInventoryItemToCategory = async (client, userID, categoryID, categoryName, selectedItemIDs) => {
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

export const useAssignInventoryItemToCategory = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ categoryID, categoryName, selectedItemIDs }) =>
      assignInventoryItemToCategory(supabaseClient, user?.id, categoryID, categoryName, selectedItemIDs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categoryList', 'inventoryList']);
      },
    }
  );
};
