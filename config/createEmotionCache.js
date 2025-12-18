import createCache from '@emotion/cache';

/**
* Creates an Emotion cache.
* @param {Object} [options]
* @param {string} [options.nonce] - CSP nonce applied to style tags inserted by Emotion.
*/
export default function createEmotionCache(options = {}) {
  const { nonce } = options;

  if (process.env.NODE_ENV !== 'production' && nonce != null && typeof nonce !== 'string') {
    // eslint-disable-next-line no-console
    console.warn('[CSP] createEmotionCache expected `nonce` to be a string or undefined.');
  }

  return createCache({ key: 'css', prepend: true, nonce });
}
