import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation } from 'react-query';

/**
 * upsert maintenance plan data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data - the maintenance details to create
 * @returns
 */
const upsertMaintenancePlanDetails = (client, data) => {
  return client.from('plan').upsert(data).select();
};

// upsert maintenance plan mutation fn
export const useUpsertMaintenancePlanDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) =>
    upsertMaintenancePlanDetails(supabaseClient, data)
  );
};
