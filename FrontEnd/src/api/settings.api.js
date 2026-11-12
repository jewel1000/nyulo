import client from './client.js';

export const fetchSiteSettings = () => client.get('/settings');
