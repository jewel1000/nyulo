export const PROJECT_CATEGORIES = [
  'Residential',
  'Penthouse & Duplex',
  'Kitchen & Wardrobe',
  'Workspace',
  'Hospitality & Retail',
];

export const CONTACT_STATUSES = ['new', 'contacted', 'closed'];

export const SERVICE_INTERESTS = [
  'Home Interiors',
  'Modular Kitchens & Wardrobes',
  'Workspace Design',
  'Restaurant & Retail Interiors',
  'Custom Furniture',
  'Renovation & Makeovers',
  'Other',
];

/** Cost-estimator pricing model (BDT per square foot). */
export const ESTIMATE_PACKAGES = {
  essential: { label: 'Essential', ratePerSqft: 1500 },
  premium: { label: 'Premium', ratePerSqft: 2600 },
  luxury: { label: 'Luxury', ratePerSqft: 4000 },
};

/** Space-type multipliers applied on top of the package rate. */
export const ESTIMATE_SPACE_TYPES = {
  apartment: { label: 'Apartment / Flat', multiplier: 1.0 },
  duplex: { label: 'Duplex / Triplex', multiplier: 1.15 },
  office: { label: 'Office', multiplier: 0.9 },
  commercial: { label: 'Commercial / Showroom', multiplier: 1.1 },
  restaurant: { label: 'Restaurant / Café', multiplier: 1.25 },
};

export const ESTIMATE_AREA_LIMITS = { min: 200, max: 50000 };
