import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// static query options for tanstack query
const useQueryOptions = {
  refetchOnWindowFocus: false,
};

/****************************************
 * FETCH FUNCTIONS PROFILE CONF DETAILS *
 ****************************************/

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
    return fetchConfigDetails(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn,
    queryKey: ['profileConfig', user.id],
    useQueryOptions,
  });
};

// supabase fn to retrieve config details for a selected user
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

// fn used for profile configuration details
export const useFetchProfileDetails = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchProfileDetails(supabaseClient, user.id).then((result) => result.data);
  };

  return useQuery({
    queryFn,
    queryKey: ['profileDetails', user.id],
    useQueryOptions,
  });
};

// supabase fn to update profile details
const upsertProfileDetails = (client, data) => {
  return client.from('profiles').upsert(data).select();
};

// fn used to update profile details
export const useUpsertProfileDetails = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileDetails(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileDetails']);
    },
  });
};

// supabase fn to update profile configuration settings
const upsertProfileConfigurationDetails = (client, data) => {
  return client.from('user_settings').upsert(data).select();
};

// fn used to update profile configuration settings
export const useUpsertProfileConfigurationDetails = () => {
  const queryClient = useQueryClient();
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileConfigurationDetails(supabaseClient, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileConfig']);
    },
  });
};