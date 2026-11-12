/**
 * Default site content. Each top-level key is one editable "section" in the
 * admin panel; a section saved in the database replaces the default below.
 *
 * FrontEnd/src/constants/siteDefaults.js is a copy of this file, used as the
 * first paint and as the fallback when the API is unreachable.
 */
const img = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const SITE_DEFAULTS = {
  company: {
    name: 'Nyulo Interior',
    tagline: 'Spaces That Feel Like Home',
    phone: '+880 1673-405835',
    email: 'hello@nyulo.com',
    address: 'House-319, Road-8, East Kazipara, Mirpur, Dhaka',
    hours: 'Sat–Thu, 10:00 AM – 7:00 PM',
    founded: 2017,
    mapQuery: 'East Kazipara, Mirpur, Dhaka',
    footerText:
      'An interior design and build studio based in Mirpur, Dhaka — crafting homes and workplaces since 2017.',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },

  hero: {
    eyebrow: 'Design & Build Studio · Mirpur, Dhaka',
    title: 'Spaces That Feel Like',
    highlight: 'Home',
    text: 'Thoughtful interiors for homes, offices and commercial spaces — planned around you, previewed in 3D and built end-to-end by one team since 2017.',
    primaryButton: 'See Our Work',
    secondaryButton: 'Book a Site Visit',
    slides: [
      { src: img('photo-1600210492486-724fe5c67fb0', 2200), label: 'Living Room' },
      { src: img('photo-1484154218962-a197022b5858', 2200), label: 'Modular Kitchen' },
      { src: img('photo-1497366754035-f200968a6e72', 2200), label: 'Workspace' },
      { src: img('photo-1517248135467-4c7edcad34c4', 2200), label: 'Restaurant' },
      { src: img('photo-1600566753086-00f18fb6b3ea', 2200), label: 'Apartment Lounge' },
    ],
  },

  stats: [
    { value: 150, suffix: '+', label: 'Spaces Completed' },
    { value: 9, suffix: '', label: 'Years in Mirpur' },
    { value: 4, suffix: ' days', label: 'Average Kitchen Install' },
    { value: 6, suffix: '', label: 'Services Under One Roof' },
  ],

  process: [
    {
      title: 'Discovery Meeting',
      duration: '60–90 minutes',
      description:
        'We listen first. A free session — at our studio or your space — to understand your needs, lifestyle, budget and timeline, and to walk you through how we work.',
    },
    {
      title: 'Concept & Mood Board',
      duration: 'About 1 week',
      description:
        'Mood boards, reference imagery and an initial design direction tailored to you, alongside a transparent preliminary budget so there are no surprises later.',
    },
    {
      title: 'Layout Planning',
      duration: '1–2 weeks',
      description:
        'Detailed layouts that optimize flow, light and function. Every zone is planned around how you will actually use it — storage first, circulation always.',
    },
    {
      title: '3D Design & Detailing',
      duration: '2–4 weeks',
      description:
        'Photorealistic 3D visualization of every room, final material and finish selection, working drawings and a line-by-line BOQ for your approval.',
    },
    {
      title: 'Build & Installation',
      duration: '6–10 weeks',
      description:
        'Our in-house execution team builds exactly what was approved. A dedicated project manager coordinates every trade and sends you regular progress updates.',
    },
    {
      title: 'Styling & Handover',
      duration: 'Final week',
      description:
        'Styling, deep cleaning, a joint quality walkthrough and your handover file — care instructions, warranties and as-built drawings. Welcome home.',
    },
  ],

  values: [
    {
      icon: 'layout',
      title: 'End-to-End Design',
      description: 'From the first sketch to the last cushion — architecture, interiors, lighting and styling under one roof.',
    },
    {
      icon: 'users',
      title: 'Seasoned Team',
      description: '9+ years and 150+ delivered projects across residential, corporate and hospitality spaces.',
    },
    {
      icon: 'gem',
      title: 'Uncompromised Quality',
      description: 'Factory-finished joinery, premium materials and a quality checklist signed at every milestone.',
    },
    {
      icon: 'key',
      title: 'Single-Point Delivery',
      description: 'One contract, one timeline, one accountable team — you simply receive the keys to a finished space.',
    },
  ],

  team: [
    { name: 'Arif Chowdhury', role: 'Principal Architect & Founder', photo: img('photo-1560250097-0b93528c311a', 600) },
    { name: 'Tasnim Rahman', role: 'Head of Interior Design', photo: img('photo-1573496359142-b8d87734a5a2', 600) },
    { name: 'Sajid Hossain', role: 'Director, Projects & Execution', photo: img('photo-1472099645785-5658abf4ff4e', 600) },
    { name: 'Nabila Karim', role: 'Lead, Visualization & Drawings', photo: img('photo-1580489944761-15a19d654956', 600) },
  ],

  about: {
    heroTitle: 'A Small Studio That Builds What It Draws',
    heroSubtitle: 'Designing homes and workplaces across Bangladesh since 2017.',
    storyTitle: 'Designed Around You, Built on Trust',
    image: img('photo-1600585154340-be6161a56a0c', 1200),
    badgeValue: '9+',
    badgeLabel: 'Years of Craft',
    paragraphs: [
      'Nyulo Interior began in 2017 with a simple conviction: great interiors are not about decoration — they are about how a space makes you live, work and feel every single day. More than 150 projects later, that conviction still drives every drawing we produce.',
      'We are a full-service studio: architects, interior designers, 3D artists and an in-house execution team under one roof. That integration is why our renders match our handovers — the people who design your space are the same people accountable for building it.',
      'From compact Aftabnagar apartments to multi-floor corporate headquarters in Motijheel, we bring the same discipline to every brief: listen first, design around life, document everything, and deliver exactly what was approved.',
    ],
    teamTitle: 'The People Behind the Projects',
    teamSubtitle: 'A multidisciplinary leadership team supported by 25+ designers, engineers and craftspeople.',
  },

  cta: {
    title: 'Ready to Start',
    highlight: 'Your Project?',
    text: 'Call us or book a site visit and we’ll come to you in Mirpur or anywhere in Dhaka. Not sure about the budget yet? Get a rough range in under a minute.',
    image: img('photo-1618221195710-dd6b41faaea6', 1920),
  },

  pricing: {
    areaMin: 200,
    areaMax: 50000,
    packages: [
      { key: 'essential', label: 'Essential', ratePerSqft: 1500 },
      { key: 'premium', label: 'Premium', ratePerSqft: 2600 },
      { key: 'luxury', label: 'Luxury', ratePerSqft: 4000 },
    ],
    spaceTypes: [
      { key: 'apartment', label: 'Apartment / Flat', multiplier: 1 },
      { key: 'duplex', label: 'Duplex / Triplex', multiplier: 1.15 },
      { key: 'office', label: 'Office', multiplier: 0.9 },
      { key: 'commercial', label: 'Commercial / Showroom', multiplier: 1.1 },
      { key: 'restaurant', label: 'Restaurant / Café', multiplier: 1.25 },
    ],
  },
};

export const SITE_SECTIONS = Object.keys(SITE_DEFAULTS);

/**
 * Lays saved sections over the defaults. Object sections are merged one
 * level deep so a field added later still gets its default; list sections
 * are replaced whole.
 */
export const mergeSiteSettings = (saved = {}) => {
  const merged = {};
  for (const section of SITE_SECTIONS) {
    const fallback = SITE_DEFAULTS[section];
    const value = saved[section];
    if (value === undefined || value === null) merged[section] = fallback;
    else if (Array.isArray(fallback)) merged[section] = Array.isArray(value) ? value : fallback;
    else merged[section] = { ...fallback, ...value };
  }
  return merged;
};
