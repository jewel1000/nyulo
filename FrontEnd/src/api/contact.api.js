import client from './client.js';

export const submitContact = (payload) => client.post('/contacts', payload);
