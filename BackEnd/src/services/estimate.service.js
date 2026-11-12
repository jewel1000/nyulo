import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import { getSiteSettings } from './settings.service.js';

const repo = () => getRepository('estimate');

/** Pricing model, editable from the admin panel (Site content → Pricing). */
const getPricing = async () => (await getSiteSettings()).pricing;

/** Pure pricing logic over a given pricing model — trivially unit-testable. */
export const quoteFor = (pricing, { spaceType, packageKey, areaSqft }) => {
  const pkg = pricing.packages.find((item) => item.key === packageKey);
  const space = pricing.spaceTypes.find((item) => item.key === spaceType);
  if (!pkg) throw ApiError.badRequest(`Unknown package '${packageKey}'`);
  if (!space) throw ApiError.badRequest(`Unknown space type '${spaceType}'`);

  const area = Number(areaSqft);
  const min = Number(pricing.areaMin);
  const max = Number(pricing.areaMax);
  if (!Number.isFinite(area) || area < min || area > max) {
    throw ApiError.badRequest(`Area must be between ${min} and ${max} sqft`);
  }

  const baseRate = Number(pkg.ratePerSqft);
  const multiplier = Number(space.multiplier);
  const effectiveRate = Math.round(baseRate * multiplier);
  const total = effectiveRate * area;

  return {
    currency: 'BDT',
    package: { key: pkg.key, label: pkg.label, baseRatePerSqft: baseRate },
    spaceType: { key: space.key, label: space.label, multiplier },
    areaSqft: area,
    effectiveRatePerSqft: effectiveRate,
    estimatedTotal: total,
    range: { min: Math.round(total * 0.9), max: Math.round(total * 1.1) },
    breakdown: {
      materials: Math.round(total * 0.58),
      labor: Math.round(total * 0.25),
      designAndDrawings: Math.round(total * 0.09),
      projectManagement: Math.round(total * 0.08),
    },
  };
};

export const calculateEstimate = async (input) => quoteFor(await getPricing(), input);

/** Saves an estimate together with the visitor's contact info as a lead. */
export const saveEstimateLead = async ({ name, phone, email, spaceType, packageKey, areaSqft }) => {
  const quote = await calculateEstimate({ spaceType, packageKey, areaSqft });
  const lead = await repo().create({
    name,
    phone,
    email,
    spaceType,
    packageKey,
    areaSqft: quote.areaSqft,
    estimatedMin: quote.range.min,
    estimatedMax: quote.range.max,
    status: 'new',
  });
  return { lead, quote };
};

export const listEstimates = async ({ page, limit, skip }) => {
  const [items, total] = await Promise.all([
    repo().find({ sort: '-createdAt', skip, limit }),
    repo().count({}),
  ]);
  return { items, meta: buildPaginationMeta({ page, limit, total }) };
};

/** Config the frontend needs to render the estimator form. */
export const getEstimatorConfig = async () => {
  const pricing = await getPricing();
  return {
    packages: pricing.packages,
    spaceTypes: pricing.spaceTypes,
    areaLimits: { min: Number(pricing.areaMin), max: Number(pricing.areaMax) },
    currency: 'BDT',
  };
};
