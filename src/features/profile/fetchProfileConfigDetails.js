import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// supabase fn to retrieve config details for a selected user
const fetchConfigDetails = (client, userID) => {
  return client
    .from('user_settings')
    .select(
      `
        id,
        notify_bookmarked_items,
        notify_due_items,
        notify_settings_privacy,
        display_mode,
        created_on,
        updated_by,
        updated_on
        `
    )
    .eq('id', userID)
    .single();
};

// fn used for profile configuration details
export const useFetchProfileConfigDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchConfigDetails(supabaseClient, user.id).then(
      (result) => result.data
    );
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['profileConfig', user.id],
  });
};