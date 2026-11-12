import { getRepository } from '../repositories/index.js';

/** Counts and the latest leads for the dashboard. */
export const getDashboard = async () => {
  const names = ['project', 'service', 'testimonial', 'blog', 'contact', 'estimate'];
  const counts = await Promise.all(names.map((name) => getRepository(name).count()));

  const [contacts, estimates] = await Promise.all([
    getRepository('contact').find({ sort: '-createdAt', limit: 5 }),
    getRepository('estimate').find({ sort: '-createdAt', limit: 5 }),
  ]);
  const [newContacts, newEstimates] = await Promise.all([
    getRepository('contact').count({ status: 'new' }),
    getRepository('estimate').count({ status: 'new' }),
  ]);

  return {
    counts: {
      projects: counts[0],
      services: counts[1],
      testimonials: counts[2],
      blogs: counts[3],
      contacts: counts[4],
      estimates: counts[5],
    },
    newLeads: { contacts: newContacts, estimates: newEstimates },
    recent: { contacts, estimates },
  };
};
