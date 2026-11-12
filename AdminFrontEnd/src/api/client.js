import axios from 'axios';

const TOKEN_KEY = 'nyulo_admin_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/** Turns an axios failure into an Error carrying the API's message and field errors. */
const toError = (error) => {
  const data = error.response?.data;
  const message = data?.message || (error.response ? 'Something went wrong' : 'Cannot reach the server');
  return Object.assign(new Error(message), { errors: data?.errors || [], status: error.response?.status });
};

/** Admin API: sends the session token, and signs out when the server rejects it. */
export const admin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  timeout: 30000,
});

admin.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

admin.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const isCredentialCall = /\/auth\/(login|setup|password)$/.test(error.config?.url || '');
    if (error.response?.status === 401 && !isCredentialCall) onUnauthorized();
    return Promise.reject(toError(error));
  }
);

/** Public site API: read-only, used to load the current site content. */
export const site = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 20000,
});
site.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(toError(error))
);

/** Uploads one image and resolves to its public URL. */
export const uploadImage = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const response = await admin.post('/uploads', form);
  return response.data.url;
};
