import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import {
  ESTIMATE_PACKAGES,
  ESTIMATE_SPACE_TYPES,
  ESTIMATE_AREA_LIMITS,
} from '../constants/index.js';

const repo = () => getRepository('estimate');

/** Pure pricing logic — no I/O, trivially unit-testable. */
export const calculateEstimate = ({ spaceType, packageKey, areaSqft }) => {
  const pkg = ESTIMATE_PACKAGES[packageKey];
  const space = ESTIMATE_SPACE_TYPES[spaceType];
  if (!pkg) throw ApiError.badRequest(`Unknown package '${packageKey}'`);
  if (!space) throw ApiError.badRequest(`Unknown space type '${spaceType}'`);

  const area = Number(areaSqft);
  const { min, max } = ESTIMATE_AREA_LIMITS;
  if (!Number.isFinite(area) || area < min || area > max) {
    throw ApiError.badRequest(`Area must be between ${min} and ${max} sqft`);
  }

  const effectiveRate = Math.round(pkg.ratePerSqft * space.multiplier);
  const total = effectiveRate * area;

  return {
    currency: 'BDT',
    package: { key: packageKey, label: pkg.label, baseRatePerSqft: pkg.ratePerSqft },
    spaceType: { key: spaceType, label: space.label, multiplier: space.multiplier },
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

/** Saves an estimate together with the visitor's contact info as a lead. */
export const saveEstimateLead = async ({ name, phone, email, spaceType, packageKey, areaSqft }) => {
  const quote = calculateEstimate({ spaceType, packageKey, areaSqft });
  const lead = await repo().create({
    name,
    phone,
    email,
    spaceType,
    packageKey,
    areaSqft: quote.areaSqft,
    estimatedMin: quote.range.min,
    estimatedMax: quote.range.max,
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
export const getEstimatorConfig = () => ({
  packages: Object.entries(ESTIMATE_PACKAGES).map(([key, value]) => ({ key, ...value })),
  spaceTypes: Object.entries(ESTIMATE_SPACE_TYPES).map(([key, value]) => ({ key, ...value })),
  areaLimits: ESTIMATE_AREA_LIMITS,
  currency: 'BDT',
});
