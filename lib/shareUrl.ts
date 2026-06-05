// Helpers for syncing a tool's inputs to the URL query string so the page is
// shareable: a copied link reproduces the exact configuration on load.

/** Run a handler for each query param that is present in the current URL. */
export function applyParams(handlers: Record<string, (value: string) => void>) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  for (const key of Object.keys(handlers)) {
    const v = params.get(key);
    if (v !== null) {
      try {
        handlers[key](v);
      } catch {
        /* ignore malformed param */
      }
    }
  }
}

/** Replace the URL query string with the given state (no navigation / history spam). */
export function syncParams(state: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(state)) {
    if (v === undefined || v === null || v === '') continue;
    params.set(k, String(v));
  }
  const qs = params.toString();
  window.history.replaceState(null, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
}
