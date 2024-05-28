import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useMutation } from 'react-query';

/**
 * upsert profile data from the logged in user
 * @param {Object} supabaseClient
 * @param {Object} data  - the profile details to update
 */
const upsertProfileDetails = (client, data) => {
  return client.from('profiles').upsert(data).select();
};

/**
 * upsert profile details mutation fn
 *
 */
const useUpsertProfileDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileDetails(supabaseClient, data));
};

export default useUpsertProfileDetails;
