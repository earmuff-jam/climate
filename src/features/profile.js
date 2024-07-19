import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const fetchConfigDetails = (client, userID) => {
  return client
    .from('user_settings')
    .select(
      `
          id,
          notify_bookmarked_items,
          notify_due_items,
          inventory_layout,
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

export const useFetchProfileConfig = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchConfigDetails(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn,
    queryKey: 'profileConfig',
  });
};

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

export const useFetchProfileDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchProfileDetails(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn,
    queryKey: 'profileDetails',
  });
};

const upsertProfileDetails = (client, data) => {
  return client.from('profiles').upsert(data);
};

export const useUpsertProfileDetails = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileDetails(supabaseClient, data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries('profileDetails');
      const prev = queryClient.getQueryData('profileDetails');
      queryClient.setQueryData('profileDetails', data);
      return { prev };
    },
  });
};

const upsertProfileConfig = (client, data) => {
  return client.from('user_settings').upsert(data);
};

export const useUpsertProfileConfig = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileConfig(supabaseClient, data), {
    onMutate: async (data) => {
      await queryClient.cancelQueries('profileConfig');
      const prev = queryClient.getQueryData('profileConfig');
      queryClient.setQueryData('profileConfig', data);
      return { prev };
    },
  });
};
