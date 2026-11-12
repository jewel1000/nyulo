import { getRepository } from '../repositories/index.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import logger from '../utils/logger.js';

const repo = () => getRepository('contact');

export const createContact = async (data) => {
  const contact = await repo().create({ ...data, status: 'new' });
  // Hook point: send a notification email / Slack message here later.
  logger.info(`New contact request from ${contact.name} <${contact.email}>`);
  return contact;
};

export const listContacts = async ({ status, page, limit, skip }) => {
  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    repo().find({ filter, sort: '-createdAt', skip, limit }),
    repo().count(filter),
  ]);
  return { items, meta: buildPaginationMeta({ page, limit, total }) };
};
