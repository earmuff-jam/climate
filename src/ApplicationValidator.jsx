import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import SplashPage from './Containers/SplashPage/SplashPage';
import { router } from './util/router';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { supabaseClient } from './util/SupabaseClient';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ApplicationValidator = () => {
  const [session, setSession] = useState(null);

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
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen />}
      </QueryClientProvider>
    </SessionContextProvider>
  ) : (
    <SplashPage />
  );
};

export default ApplicationValidator;
