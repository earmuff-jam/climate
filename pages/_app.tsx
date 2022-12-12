import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lighttheme";

const clientSideEmotionCache = createEmotionCache();

export default function App(props: any) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
