export const HTTP_PROTOCOL = import.meta.env.VITE_HTTP_PROTOCOL;
export const WS_PROTOCOL = import.meta.env.VITE_WS_PROTOCOL;
export const IP = import.meta.env.VITE_HOST_IP;
export const BACKEND_PORT = import.meta.env.VITE_HOST_BACKEND_PORT || '';
export const FRONTEND_PORT = import.meta.env.VITE_HOST_FRONTEND_PORT || '';

export const API_URL = `${HTTP_PROTOCOL}://${IP}${BACKEND_PORT ? `:${BACKEND_PORT}` : ''}/api/v1`;
