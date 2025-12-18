import createCache from '@emotion/cache';

export default function createEmotionCache(options = {}) {
  const { nonce } = options;

  if (process.env.NODE_ENV !== 'production' && nonce != null && typeof nonce !== 'string') {
    // eslint-disable-next-line no-console
    console.warn('[CSP] createEmotionCache expected `nonce` to be a string or undefined.');
  }

  return createCache({ key: 'css', prepend: true, nonce });
}
