import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import SplashPage from './Containers/SplashPage/SplashPage';
import { router } from './util/router';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { supabaseClient } from './util/SupabaseClient';

const ApplicationValidator = () => {
  const [session, setSession] = useState(null);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session ? (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SessionContextProvider>
  ) : (
    <SplashPage />
  );
};

export default ApplicationValidator;
