import { getRepository } from '../repositories/index.js';
import { mergeSiteSettings } from '../seed/siteDefaults.js';

/** Site content: saved sections laid over the built-in defaults. */
export const getSiteSettings = async () => {
  const docs = await getRepository('setting').find({ sort: null });
  const saved = Object.fromEntries(docs.map((doc) => [doc.section, doc.value]));
  return mergeSiteSettings(saved);
};
