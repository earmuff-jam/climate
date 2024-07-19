import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITEM_TYPE_MAPPER } from '../Components/Maintenance/constants';
import dayjs from 'dayjs';

const fetchPlans = (client, userID) => {
  return client
    .from('maintenance_plan')
    .select(
      `
      id,
      plan,
      description,
      type,
      color,
      term_limit,
      created_on,
      created_by,
      updated_on,
      updated_by,
      maintenanceItems:maintenance_item!id(
        id,
        item_id,
        overflow
      ),
      sharable_groups,
      updator_name:profiles!updated_by(
        username
      )
        `
    )
    .eq('created_by', userID);
};

/**
 * retrieves the list of plans created by the user
 */
export const useFetchPlans = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const result = await fetchPlans(supabaseClient, user.id);
    const formattedResults = result.data.map((item) => {
      return { ...item, type: ITEM_TYPE_MAPPER[item.type].text };
    });
    return formattedResults;
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'plans',
  });
};

const fetchPlanItems = (client, userID) => {
  return client.from('maintenance_item').select(`id`).eq('created_by', userID);
};

/**
 * retrieves the list of items on at least one plan created by the selected user
 */
export const useFetchPlanItems = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const queryFn = async () => {
    return fetchPlanItems(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: 'plan_items',
  });
};

/**
 * retrives the inventory items asociated with a selected plan
 * created by the selected user
 * @param {object} supabaseClient - the client used to fetch data from
 * @param {string} userID - the user id of the selected user
 * @param {string} planID - the plan id of the selected plan
 * @returns
 */
export const fetchInvItemsForPlan = (client, userID, planID) => {
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
      maintenance_item!inner (
        maintenance_id,
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
    .eq('maintenance_item.maintenance_id', planID)
    .eq('created_by', userID);
};

const addPlan = (client, data) => {
  return client.from('maintenance_plan').upsert(data).select();
};

/**
 * add maintenance plan by the selected user
 */
export const useAddPlan = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => addPlan(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('plans');
    },
  });
};

const deletePlan = (client, planID) => {
  return client.from('maintenance_plan').delete().eq('id', planID);
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deletePlan(supabaseClient, id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('plans');
      const prev = queryClient.getQueryData('plans');
      queryClient.setQueryData('plans', (old) => old.filter((v) => v.id != id));
      return { prev };
    },
  });
};

const deleteItemFromPlan = (client, id) => {
  return client.from('maintenance_item').delete().eq('item_id', id);
};

/**
 * deletes the selected item from the associated maintenance plan
 */
export const useDeleteItemFromPlan = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteItemFromPlan(supabaseClient, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['plans']);
    },
  });
};

/**
 * Assign maintenance plan to selected inventory item
 * @param {Object} supabaseClient
 * @param {String} userID - the ID of the user making the request
 * @param {String} planID - the maintenancePlan ID to associate the inventory item against
 * @param {Array} selectedItemIDs - the IDs of the selected inventory items
 * @returns {Promise} - a promise that resolves when all upsert operations are complete
 */
const assignItemsToPlan = async (client, userID, planID, planName, selectedItemIDs) => {
  const promises = selectedItemIDs.map((element) => {
    return client
      .from('maintenance_item')
      .upsert({
        maintenance_id: planID,
        maintenance_plan_name: planName,
        item_id: element,
        status: '1',
        created_on: dayjs(),
        created_by: userID,
        sharable_groups: [userID],
      })
      .select();
  });

  // Wait for all upsert operations to complete
  return Promise.all(promises);
};

/**
 * assigns list of items to a selected plan created by the user
 */
export const useAssignItemsToPlan = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ planID, planName, selectedIDs }) => assignItemsToPlan(supabaseClient, user?.id, planID, planName, selectedIDs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['plans', 'inventoryList']);
      },
    }
  );
};
