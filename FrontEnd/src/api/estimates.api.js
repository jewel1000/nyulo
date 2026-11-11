import client from './client.js';

export const fetchEstimatorConfig = () => client.get('/estimates/config');
export const calculateEstimate = (payload) => client.post('/estimates/calculate', payload);
export const saveEstimateLead = (payload) => client.post('/estimates', payload);
