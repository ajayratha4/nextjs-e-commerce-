import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "theme";
import createEmotionCache from "theme/createEmotionCache";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "100vh",
          }}
        >
          <Box>
            <Header />
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <Component {...pageProps} />
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
