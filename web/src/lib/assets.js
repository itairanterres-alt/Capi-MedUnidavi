// Resolve prototype asset paths (e.g. "uploads/Dr Capi.png") to the real
// public URL served by Vite (/uploads/...). Mirrors the prototype's
// window.__resolveAsset shim used by the standalone build.
export function resolveAsset(src) {
  if (!src) return src;
  if (/^(https?:|data:|blob:|\/)/.test(src)) return src;
  return '/' + src.split('/').map(encodeURIComponent).join('/');
}
