import React from 'react';
import EntryForm from './EntryForm';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import HomeAppBar from '../AppBar/HomeAppBar';

const PrivateLayout = ({ children }) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!user?.id)
    return <EntryForm redirectUri={redirectUri} supabase={supabaseClient} />;

  return (
    <>
      {/* All users are logged in if arrive here */}
      <HomeAppBar isUserLoggedIn={true} />
      <div>{children}</div>
    </>
  );
};

export default PrivateLayout;
