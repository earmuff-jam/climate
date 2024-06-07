import { ITEM_TYPE_MAPPER } from '@/components/Plan/constants';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useMutation, useQuery } from 'react-query';

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
      created_on,
      created_by,
      updated_on,
      updated_by,
      sharable_groups,
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

// fn used to fetch all maintenance list for a selected user
export const useFetchMaintenanceList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    const result = await fetchMaintenancePlanList(supabaseClient, user.id);
    const formattedResults = result.data.map((item) => {
      return {
        ...item,
        creator_name: item.creator_name?.username,
        updator_name: item.updator_name?.username,
        type: ITEM_TYPE_MAPPER[item.type],
      };
    });
    return formattedResults;
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['maintenancePlanDetails', user.id],
  });
};

/**
 * upsert maintenance plan data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the maintenance details to create
 * @returns
 */
const upsertMaintenancePlanDetails = (client, data) => {
  return client.from('maintenance_plan').upsert(data).select();
};

// upsert maintenance plan mutation fn
export const useUpsertMaintenancePlanDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) =>
    upsertMaintenancePlanDetails(supabaseClient, data)
  );
};

/**
 *
 * @param {Object} supabaseClient
 * @param {String} maintenancePlanID - the maintenancePlan ID to delete
 * @returns
 */
const deleteMaintenancePlan = (client, maintenancePlanID) => {
  return client.from('maintenance_plan').delete().eq('id', maintenancePlanID);
};

export const useDeleteSelectedMaintenancePlan = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((id) => deleteMaintenancePlan(supabaseClient, id));
};
