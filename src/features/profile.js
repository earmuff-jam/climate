import { useQuery, useMutation } from 'react-query';
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
    return fetchProfileDetails(supabaseClient, user.id).then(
      (result) => result.data
    );
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['profileDetails', user.id],
  });
};

// supabase fn to update profile notification settings
const upsertProfileNotificationDetails = (client, data) => {
  return client.from('user_settings').upsert(data).select();
};

// fn used to update profile notification settings
export const useUpsertProfileNotificationDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) =>
    upsertProfileNotificationDetails(supabaseClient, data)
  );
};

// supabase fn to update profile details
const upsertProfileDetails = (client, data) => {
  return client.from('profiles').upsert(data).select();
};

// fn used to update profile details
export const useUpsertProfileDetails = () => {
  const supabaseClient = useSupabaseClient();
  return useMutation((data) => upsertProfileDetails(supabaseClient, data));
};
