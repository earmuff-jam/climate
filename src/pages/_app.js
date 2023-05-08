import "@/styles/globals.css";
import React, { useState } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { ReactQueryDevtools } from "react-query/devtools";
import LayoutWrapper from "@/components/Auth/LayoutWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.intialSession}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
