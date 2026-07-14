// Builds a URL against the configured backend.
//
// If VITE_API_URL is set (e.g. "http://localhost:7004" for local dev, or
// "https://api.yourdomain.com" in production), requests go straight to that
// host. Otherwise it falls back to Vite's BASE_URL, which keeps requests
// relative to whatever origin the frontend itself is served from (useful
// when the frontend and backend are deployed behind the same domain/proxy).
export function apiUrl(path) {
  const base = import.meta.env.VITE_API_URL || import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
