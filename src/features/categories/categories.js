import { useMutation, useQuery } from "react-query";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

// supabase fn to retrieve list of categories for a selected user
const fetchCategoriesList = (client, userID) => {
  return client
    .from("category")
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
        sharable_groups
        `
    )
    .eq("created_by", userID);
};

// fn used to fetch all categories for a selected user
export const useFetchCategoryList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchCategoriesList(supabaseClient, user.id).then(
      (result) => result.data
    );
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ["categoryList", user.id],
  });
};

/**
 * upsert category data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the category details to create
 * @returns
 */
const upsertCategoryDetails = (client, data) => {
  return client.from("category").upsert(data).select();
};

// upsert category details mutation fn
export const useUpsertCategoryDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertCategoryDetails(supabaseClient, data));
};

/**
 *
 * @param {Object} supabaseClient
 * @param {String} categoryID - the category ID to delete
 * @returns
 */
const deleteCategoryDetails = (client, categoryID) => {
  return client.from("category").delete().eq("id", categoryID);
};

export const useDeleteSelectedCategory = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteCategoryDetails(supabaseClient, id));
};
