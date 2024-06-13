import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITEM_TYPE_MAPPER } from '../Components/Maintenance/constants';
import dayjs from 'dayjs';

// static query options for tanstack query
const useQueryOptions = {
  refetchOnWindowFocus: false,
};

// supabase fn to retrieve all maintenance list for a selected user
const fetchMaintenancePlanList = (client, userID) => {
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

// fn used to fetch all maintenance list for a selected user
export const useFetchMaintenanceList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const result = await fetchMaintenancePlanList(supabaseClient, user.id);
    const formattedResults = result.data.map((item) => {
      return { ...item, type: ITEM_TYPE_MAPPER[item.type].text };
    });
    return formattedResults;
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['maintenancePlanDetails', user.id],
    useQueryOptions,
  });
};

/**
 * upsert maintenance plan data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the maintenance details to create
 */
const upsertMaintenancePlanDetails = (client, data) => {
  return client.from('maintenance_plan').upsert(data).select();
};

// upsert maintenance plan mutation fn
export const useUpsertMaintenancePlanDetails = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertMaintenancePlanDetails(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['maintenancePlanDetails']);
    },
  });
};

/**
 *
 * @param {Object} supabaseClient
 * @param {String} maintenancePlanID - the maintenancePlan ID to delete
 */
const deleteMaintenancePlan = (client, maintenancePlanID) => {
  return client.from('maintenance_plan').delete().eq('id', maintenancePlanID);
};

export const useDeleteSelectedMaintenancePlan = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteMaintenancePlan(supabaseClient, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['maintenancePlanDetails']);
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
const assignInventoryItemToMaintenancePlan = async (client, userID, planID, planName, selectedItemIDs) => {
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

export const useAssignInventoryItemToMaintenancePlan = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation(
    ({ planID, planName, selectedIDs }) =>
      assignInventoryItemToMaintenancePlan(supabaseClient, user?.id, planID, planName, selectedIDs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['maintenancePlanDetails', 'inventoryList']);
      },
    }
  );
};

/**
 * fetch inventories relative to maintenance plan. Eg, annual maintenance plan will return all inventories
 * items that are associated against annual maintenance plan
 */

export const fetchInventoryItemsAgainstSelectedMaintenancePlan = (client, userID, planID) => {
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
