import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { CSP_NONCE_META_NAME } from '../config/csp';
import createEmotionCache from '../config/createEmotionCache';
import theme from '../config/theme';

function getCspNonceFromMeta() {
  if (typeof document === 'undefined') return undefined;
  return document.querySelector(`meta[name="${CSP_NONCE_META_NAME}"]`)?.getAttribute('content') ?? undefined;
}

let clientSideEmotionCache;
let clientSideNonce;

function getOrCreateClientSideEmotionCache() {
  if (typeof window === 'undefined') return createEmotionCache();

  const nonce = getCspNonceFromMeta();
  const nonceRequired = process.env.CSP_NONCE_REQUIRED === 'true';

  if (!nonce && nonceRequired && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[CSP] CSP_NONCE_REQUIRED=true but no CSP nonce meta tag was found on the client.');
  }

  if (!clientSideEmotionCache) {
    clientSideNonce = nonce;
    clientSideEmotionCache = createEmotionCache({ nonce });
  } else if (
    process.env.NODE_ENV !== 'production' &&
    ((clientSideNonce && nonce && clientSideNonce !== nonce) || (!clientSideNonce && nonce))
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      clientSideNonce
        ? '[CSP] Emotion cache nonce changed after initialization; this is not supported.'
        : '[CSP] CSP nonce appeared after the Emotion cache was created without one; styles may not satisfy CSP.',
    );
  }

  return clientSideEmotionCache;
}

export default function MyApp(props) {
  const { Component, emotionCache: providedEmotionCache, pageProps } = props;
  const emotionCache = providedEmotionCache || getOrCreateClientSideEmotionCache();

  return (
    <CacheProvider value={emotionCache}>
      <React.Fragment>
        <Head>
          <title>Hungry Helper</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </CacheProvider>
  );
}
