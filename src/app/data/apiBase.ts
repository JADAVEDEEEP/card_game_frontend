const LOCAL_API_BASE_URL = "http://localhost:3000";
const PROD_API_BASE_URL = "https://onepice-cardgame.onrender.com";
const ENV_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();
const DEFAULT_API_BASE_URL = import.meta.env.DEV ? LOCAL_API_BASE_URL : PROD_API_BASE_URL;

export const API_BASE_URL = (ENV_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");

export const withApiBase = (path: string) => {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
