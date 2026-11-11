import client from './client.js';

export const fetchTestimonials = (params = {}) => client.get('/testimonials', { params });
