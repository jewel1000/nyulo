import client from './client.js';

export const fetchProjects = (params = {}) => client.get('/projects', { params });
export const fetchProjectBySlug = (slug) => client.get(`/projects/${slug}`);
