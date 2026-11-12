import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import { isSafeUrl } from '../utils/validate.js';

/** Editable site sections and whether each holds a list or a set of fields. */
const SECTIONS = {
  company: 'object',
  hero: 'object',
  stats: 'list',
  process: 'list',
  values: 'list',
  team: 'list',
  about: 'object',
  cta: 'object',
  pricing: 'object',
};

/** Fields that end up in `src`/`href` attributes on the public site. */
const URL_KEYS = new Set(['src', 'image', 'photo', 'facebook', 'instagram', 'linkedin', 'youtube']);
/** Fields the public site does arithmetic with. */
const NUMBER_KEYS = new Set(['value', 'ratePerSqft', 'multiplier', 'areaMin', 'areaMax', 'founded']);

const MAX_BYTES = 200 * 1024;

/** Walks the value, trimming text and enforcing the URL and number rules. */
const clean = (node, key, path, errors) => {
  if (Array.isArray(node)) return node.map((item, i) => clean(item, key, `${path}[${i + 1}]`, errors));
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, clean(v, k, path ? `${path}.${k}` : k, errors)])
    );
  }

  if (NUMBER_KEYS.has(key)) {
    const number = Number(node);
    if (node === '' || node === null || Number.isNaN(number) || number < 0) errors.push(`${path} must be a number`);
    return number;
  }
  if (typeof node === 'string') {
    const text = node.trim();
    if (URL_KEYS.has(key) && text !== '' && !isSafeUrl(text)) {
      errors.push(`${path} must be an address starting with http(s):// or /`);
    }
    return text;
  }
  return node;
};

export const updateSection = async (section, value) => {
  const kind = SECTIONS[section];
  if (!kind) throw ApiError.notFound(`Unknown site section '${section}'`);

  const isList = Array.isArray(value);
  if (kind === 'list' ? !isList : isList || !value || typeof value !== 'object') {
    throw ApiError.badRequest(`'${section}' must be ${kind === 'list' ? 'a list' : 'a set of fields'}`);
  }
  if (Buffer.byteLength(JSON.stringify(value)) > MAX_BYTES) {
    throw ApiError.badRequest('That section is too large to save');
  }

  const errors = [];
  const cleaned = clean(value, null, '', errors);
  if (section === 'pricing') {
    if (!cleaned.packages?.length || !cleaned.spaceTypes?.length) {
      errors.push('Pricing needs at least one package and one space type');
    }
    if (Number(cleaned.areaMin) >= Number(cleaned.areaMax)) errors.push('Minimum area must be below maximum area');
    for (const item of [...(cleaned.packages || []), ...(cleaned.spaceTypes || [])]) {
      if (!item.key || !item.label) errors.push('Every package and space type needs a key and a label');
    }
  }
  if (errors.length) throw ApiError.unprocessable('Please fix the highlighted fields', [...new Set(errors)]);

  const store = getRepository('setting');
  const existing = await store.findOne({ section });
  const saved = existing
    ? await store.updateById(existing._id, { value: cleaned })
    : await store.create({ section, value: cleaned });
  return saved.value;
};

/** Removes a saved section so the public site falls back to its built-in default. */
export const resetSection = async (section) => {
  if (!SECTIONS[section]) throw ApiError.notFound(`Unknown site section '${section}'`);
  const store = getRepository('setting');
  const existing = await store.findOne({ section });
  if (existing) await store.deleteById(existing._id);
};
