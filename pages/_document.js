import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionCache from '../config/createEmotionCache';
import { CSP_NONCE_HEADER_NAMES, CSP_NONCE_META_NAME } from '../config/csp';
import theme from '../config/theme';

function getCspNonce(req) {
  if (!req?.headers) return undefined;

  for (const headerName of CSP_NONCE_HEADER_NAMES) {
    const value = req.headers[headerName];
    if (!value) continue;

    if (Array.isArray(value)) {
      if (process.env.CSP_NONCE_REQUIRED === 'true' && process.env.NODE_ENV === 'production') {
        throw new Error(
          `[CSP] Multiple values found for nonce header "${headerName}"; CSP_NONCE_REQUIRED=true requires a single nonce value.`,
        );
      }

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[CSP] Multiple values found for nonce header "${headerName}"; using the first one.`);
      }
      return value[0];
    }

    return value;
  }

  return undefined;
}

function ensureCspNoncePresent(nonce, req) {
  if (nonce || process.env.CSP_NONCE_REQUIRED !== 'true' || !req) return;

  const url = req.url ? ` (${req.url})` : '';

  if (process.env.NODE_ENV === 'production') {
    throw new Error(`[CSP] CSP_NONCE_REQUIRED=true but no nonce header was found on the request${url}.`);
  }

  // eslint-disable-next-line no-console
  console.warn(
    `[CSP] CSP_NONCE_REQUIRED=true but no nonce header was found on the request${url}; CSP enforcement is degraded in this environment.`,
  );
}

function createNonceAwareEmotionStyleTags(styles, nonce) {
  if (!Array.isArray(styles)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[CSP] Unexpected Emotion styles shape; expected an array of styles.');
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[CSP] Unexpected Emotion styles shape; expected an array of styles.');
    }

    return [];
  }

  return styles
    .filter(style => style && typeof style.css === 'string')
    .map(style => {
      const ids = Array.isArray(style.ids) ? style.ids : [];
      const keyAttr = `${style.key} ${ids.join(' ')}`;

      return (
        <style
          nonce={nonce}
          data-emotion={keyAttr}
          key={keyAttr}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      );
    });
}

export default class MyDocument extends Document {
  render() {
    const { nonce } = this.props;

    if (process.env.NODE_ENV !== 'production' && process.env.CSP_NONCE_REQUIRED === 'true' && !nonce) {
      // eslint-disable-next-line no-console
      console.warn('[CSP] MyDocument.render expected a nonce prop but none was provided.');
    }

    return (
      <Html lang="en">
        <Head>
          {nonce ? <meta name={CSP_NONCE_META_NAME} content={nonce} /> : null}
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage;
  const rawNonce = getCspNonce(ctx.req);
  let nonce = rawNonce;

  if (typeof rawNonce === 'string') {
    const trimmed = rawNonce.trim();
    const hasWrappingDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
    const hasWrappingSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

    nonce = hasWrappingDoubleQuotes || hasWrappingSingleQuotes ? trimmed.slice(1, -1) : trimmed;
  }

  ensureCspNoncePresent(nonce, ctx.req);

  if (!nonce && process.env.NODE_ENV !== 'production' && process.env.CSP_NONCE_REQUIRED !== 'true') {
    // eslint-disable-next-line no-console
    console.warn(
      '[CSP] No nonce header found on request; Emotion styles will be rendered without a nonce.',
    );
  }

  const cache = createEmotionCache({ nonce });
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = createNonceAwareEmotionStyleTags(emotionStyles.styles, nonce);

  return {
    ...initialProps,
    nonce,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
