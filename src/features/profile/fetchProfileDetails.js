import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const useFetchProfileDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchProfileDetails(supabaseClient, user.id).then(
      (result) => result.data
    );
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['profileConfig', user.id],
  });
};

export default useFetchProfileDetails;

const fetchProfileDetails = (client, userID) => {
  return client
    .from('profiles')
    .select(
      `
    id,
    updated_on,
    username,
    first_name,
    last_name,
    bio,
    user_role,
    created_on,
    updated_by
    `
    )
    .eq('id', userID)
    .single();
};
