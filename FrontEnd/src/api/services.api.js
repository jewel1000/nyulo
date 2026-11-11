import client from './client.js';

export const fetchServices = () => client.get('/services');
export const fetchServiceBySlug = (slug) => client.get(`/services/${slug}`);
