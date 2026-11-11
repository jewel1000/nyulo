import client from './client.js';

export const fetchBlogs = (params = {}) => client.get('/blogs', { params });
export const fetchBlogBySlug = (slug) => client.get(`/blogs/${slug}`);
