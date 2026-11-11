import axios from 'axios';

/**
 * Single configured axios instance for the whole app.
 * The API envelope is { success, message, data, meta? } — interceptor
 * unwraps it so callers receive { data, meta, message } directly.
 */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
    const errors = error.response?.data?.errors || [];
    return Promise.reject(Object.assign(new Error(message), { errors, status: error.response?.status }));
  }
);

export default client;
