import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dayjs from 'dayjs';

// static query options for tanstack query
const useQueryOptions = {
  refetchOnWindowFocus: false,
};

/**************************************
 * FETCH FUNCTIONS CATEGORIES DETAILS *
 **************************************/

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
        thresholdlimit,
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
    .eq('created_by', userID)
    .order('category_name', { ascending: true });
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
 * fn to retrieve the count of items associated with at least one category created by the user
 * @param {Object} supabaseClient
 * @param {String} userID - the userID of the user
 */
const fetchItemCategoryCount = (client, userID) => {
  return client.from('category_item').select(`id`).eq('created_by', userID);
};

export const useFetchCategoryItemsCount = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    return fetchItemCategoryCount(supabaseClient, user.id).then((result) => result.data.length);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['category_item_count', user.id],
    useQueryOptions,
  });
};

/**
 * fn to retrieve the count of categories created by the user
 * @param {Object} supabaseClient
 * @param {String} userID - the userID of the user
 */
const fetchCategoriesCount = (client, userID) => {
  return client.from('category').select(`id`).eq('created_by', userID);
};

export const useFetchCategoriesCount = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    return fetchCategoriesCount(supabaseClient, user.id).then((result) => result.data.length);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['categories_count', user.id],
    useQueryOptions,
  });
};

const fetchLowThresholdItemsWithCategory = (client, userID) => {
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

export const useFetchLowThresholdItemsWithCategory = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const { data } = await fetchLowThresholdItemsWithCategory(supabaseClient, user.id);
    const aboveThresholdLimit = data.reduce((acc, el) => {
      const thresholdLimit = el.category.thresholdlimit;
      if (el.inventories.quantity >= thresholdLimit) {
        acc.push(el);
      }
      return acc;
    }, []);
    return aboveThresholdLimit || [];
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['low_threshold_items_with_categories', user.id],
    useQueryOptions,
  });
};

/**
 * fetch inventories relative to categories. Eg, items marked with bookmarked categories
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

/*****************************************
 * MUTATION FUNCTIONS CATEGORIES DETAILS *
 *****************************************/

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
 * upsert the category threshold limit
 * @param {Object} supabaseClient
 * @param {string} thresholdLimit - the threshold limit for the selected category
 * @param {UUID} categoryID - the id of the selected category
 */
const upsertCategoryThresholds = (client, thresholdLimit, categoryID) => {
  return client.from('category').update({ thresholdlimit: thresholdLimit }).eq('id', categoryID);
};

// fn to update the category threshold limit
export const useUpsertCategoryThresholdsLimit = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ thresholdLimit, categoryID }) => upsertCategoryThresholds(supabaseClient, thresholdLimit, categoryID),
    {
      onMutate: async ({ thresholdLimit, categoryID }) => {
        await queryClient.cancelQueries(['categoryList']);
        const previousCategoryData = queryClient.getQueryData(['categoryList']);
        queryClient.setQueryData(['categoryList'], (oldData) => {
          return oldData?.map((category) =>
            category.id === categoryID ? { ...category, thresholdlimit: thresholdLimit } : category
          );
        });
        return { previousCategoryData };
      },
      onError: (context) => {
        queryClient.setQueryData(['categoryList'], context.previousCategoryData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['categoryList', 'low_threshold_items_with_categories']);
      },
    }
  );
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
        queryClient.invalidateQueries(['categoryList', 'low_threshold_items_with_categories', 'inventoryList']);
      },
    }
  );
};
