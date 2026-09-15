/**
 * Utility for Zero-Backend State Sharing via URL query parameters
 * Allows sharing decisions and state directly in the URL without requiring a database.
 */

export function parseUrlParams() {
  if (typeof window === 'undefined') {
    return { spot: null, time: null, lang: null, user: null, isSharedInvite: false };
  }

  const params = new URLSearchParams(window.location.search);
  const spot = params.get('spot');
  const time = params.get('time');
  const lang = params.get('lang');
  const user = params.get('user');
  const e_spot = params.get('e_spot') || params.get('eb_spot');
  const e_time = params.get('e_time') || params.get('eb_time');
  const c_spot = params.get('c_spot') || params.get('claire_spot');
  const c_time = params.get('c_time') || params.get('claire_time');

  return {
    spot: spot || null,
    time: time || null,
    lang: ['fr', 'en', 'de'].includes(lang) ? lang : null,
    user: user === 'erhard' || user === 'claire' ? user : null,
    e_spot: e_spot || null,
    e_time: e_time || null,
    c_spot: c_spot || null,
    c_time: c_time || null,
    isSharedInvite: Boolean(spot || e_spot || c_spot)
  };
}

export function syncUrlParams({ spot, time, lang, user }) {
  if (typeof window === 'undefined') return;

  const href = window.location.href || (window.location.origin ? `${window.location.origin}${window.location.pathname || ''}${window.location.search || ''}` : '');
  if (!href) return;

  const url = new URL(href);
  const params = url.searchParams;

  if (spot) {
    params.set('spot', spot);
  } else if (spot === null) {
    params.delete('spot');
  }

  if (time) {
    params.set('time', time);
  } else if (time === null) {
    params.delete('time');
  }

  if (lang) {
    params.set('lang', lang);
  } else if (lang === null) {
    params.delete('lang');
  }

  if (user) {
    params.set('user', user);
  }

  const newSearch = params.toString();
  const newPath = newSearch ? `${url.pathname}?${newSearch}` : url.pathname;
  window.history.replaceState(null, '', newPath);
}

export function buildShareUrl({ spot, time, lang }) {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.origin + window.location.pathname);
  if (spot) url.searchParams.set('spot', spot);
  if (time) url.searchParams.set('time', time);
  if (lang) url.searchParams.set('lang', lang);

  return url.toString();
}

/**
 * Native Web Share API with automatic clipboard fallback
 */
export async function shareDecisionData({ title, text, url }) {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const sharePayload = {
    title: title || "Rendez-vous d'anniversaire Clouseau",
    text: text ? `${text}\n\n🔗 ${targetUrl}` : targetUrl,
    url: targetUrl
  };

  // Try Native Web Share (works on iOS Safari, Android Chrome, modern macOS Safari)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(sharePayload);
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, method: 'cancelled' };
      }
    }
  }

  // Fallback: Copy to clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(sharePayload.text);
    return { success: true, method: 'clipboard' };
  }

  return { success: false, method: 'none' };
}
