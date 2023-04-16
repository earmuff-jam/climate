import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../containers/LayoutContainer/Layout";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lighttheme";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.intialSession}
    >
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </SessionContextProvider>
  );
}
