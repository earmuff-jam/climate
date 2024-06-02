import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// supabase fn to retrieve list of storage locations
const fetchStorageLocations = (client) => {
  return client.from('storage_locations').select(
    `
      id,
      location,
      created_at,
      created_by,
      updated_at,
      updated_by,
      sharable_groups
    `
  );
};

// fn used to fetch all storage locations for a selected user
export const useFetchStorageLocationList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const queryFn = async () => {
    return fetchStorageLocations(supabaseClient).then((result) => result.data);
  };

  return useQuery({
    queryFn: queryFn,
    queryKey: ['storageLocationList', user.id],
  });
};
