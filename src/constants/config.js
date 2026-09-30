// Vite inlines VITE_* at BUILD time, so a bundle built with an explicit host can only ever
// talk to that host -- moving the deployment (IP -> domain, http -> https) would need a
// rebuild. Leaving them unset makes the bundle resolve the API against whatever origin
// served it, which is exactly what the reverse proxy in front of it already terminates.
const envHttpProtocol = import.meta.env.VITE_HTTP_PROTOCOL;
const envWsProtocol = import.meta.env.VITE_WS_PROTOCOL;
const envHost = import.meta.env.VITE_HOST_IP;

export const HTTP_PROTOCOL = envHttpProtocol || window.location.protocol.replace(':', '');
export const WS_PROTOCOL =
  envWsProtocol || (window.location.protocol === 'https:' ? 'wss' : 'ws');
// `window.location.host` already carries the port when there is a non-default one, which is
// why BACKEND_PORT/FRONTEND_PORT stay empty in same-origin deployments.
export const IP = envHost || window.location.host;
export const BACKEND_PORT = import.meta.env.VITE_HOST_BACKEND_PORT || '';
export const FRONTEND_PORT = import.meta.env.VITE_HOST_FRONTEND_PORT || '';

export const API_URL = `${HTTP_PROTOCOL}://${IP}${BACKEND_PORT ? `:${BACKEND_PORT}` : ''}/api/v1`;
export const WS_URL = `${WS_PROTOCOL}://${IP}${BACKEND_PORT ? `:${BACKEND_PORT}` : ''}/ws`;
