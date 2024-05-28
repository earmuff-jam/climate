import { useMutation } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

/**
 * upsert notification data for the logged in user
 * @param {Object} supabaseClient
 * @param {*} data - the notification details
 */
const upsertProfileNotificationDetails = (client, data) => {
  return client.from('user_settings').upsert(data).select();
};

/**
 * upsert profile notification details mutation fn
 */
export const useUpsertProfileNotificationDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) =>
    upsertProfileNotificationDetails(supabaseClient, data)
  );
};

export default useUpsertProfileNotificationDetails;
