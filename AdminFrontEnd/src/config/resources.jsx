import { Star } from 'lucide-react';
import { formatDate } from '../components/ui.jsx';

export const PROJECT_CATEGORIES = [
  'Residential',
  'Penthouse & Duplex',
  'Kitchen & Wardrobe',
  'Workspace',
  'Hospitality & Retail',
];

/** Icons the public site knows how to draw (see FrontEnd/src/utils/iconMap.js). */
export const ICON_OPTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'kitchen', label: 'Kitchen / cooking pot' },
  { value: 'briefcase', label: 'Briefcase (office)' },
  { value: 'store', label: 'Shop front' },
  { value: 'armchair', label: 'Armchair (furniture)' },
  { value: 'hammer', label: 'Hammer (renovation)' },
  { value: 'building', label: 'Building' },
  { value: 'box', label: 'Box / 3D' },
  { value: 'hard-hat', label: 'Hard hat (construction)' },
  { value: 'trees', label: 'Trees (landscape)' },
  { value: 'layout', label: 'Layout' },
  { value: 'users', label: 'People' },
  { value: 'gem', label: 'Gem (quality)' },
  { value: 'key', label: 'Key (handover)' },
  { value: 'sparkles', label: 'Sparkles' },
];

const Thumb = ({ src }) =>
  src ? (
    <img src={src} alt="" className="h-11 w-16 rounded-md object-cover" />
  ) : (
    <span className="block h-11 w-16 rounded-md bg-neutral-100" />
  );

const Pill = ({ on, children }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
      on ? 'bg-brand-100 text-brand-700' : 'bg-neutral-100 text-neutral-500'
    }`}
  >
    {children}
  </span>
);

const BLANK_LINE_HELP = 'Leave an empty line between paragraphs.';

/**
 * One entry per content collection: how to list it and how to edit it.
 * `publicPath` builds the link to the record on the live site.
 */
export const RESOURCES = {
  projects: {
    title: 'Projects',
    singular: 'project',
    description: 'The portfolio shown under “Our Work”. Featured projects also appear on the homepage.',
    publicPath: (record) => `/work/${record.slug}`,
    searchKeys: ['title', 'location', 'category'],
    columns: [
      { label: '', render: (r) => <Thumb src={r.coverImage} /> },
      { label: 'Title', render: (r) => <span className="font-semibold">{r.title}</span> },
      { label: 'Category', render: (r) => r.category },
      { label: 'Location', render: (r) => r.location },
      { label: 'Photos', render: (r) => r.images?.length || 0 },
      { label: 'Homepage', render: (r) => <Pill on={r.featured}>{r.featured ? 'Featured' : 'No'}</Pill> },
    ],
    defaults: {
      category: 'Residential',
      year: new Date().getFullYear(),
      featured: false,
      scope: [],
      images: [],
    },
    fields: [
      { name: 'title', label: 'Project name', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', options: PROJECT_CATEGORIES, required: true },
      { name: 'location', label: 'Location', type: 'text', required: true },
      { name: 'areaSqft', label: 'Area (sqft)', type: 'number', required: true },
      { name: 'year', label: 'Year completed', type: 'number', required: true },
      { name: 'client', label: 'Client', type: 'text', help: 'Shown as “Private” when left empty.' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 7, required: true, help: BLANK_LINE_HELP },
      { name: 'scope', label: 'Scope of work', type: 'list', addLabel: 'Add scope item' },
      { name: 'coverImage', label: 'Cover photo', type: 'image', required: true, help: 'Used on cards and at the top of the project page.' },
      { name: 'images', label: 'Gallery photos', type: 'images', help: 'Shown in the project gallery in this order. The first photo is displayed largest.' },
      { name: 'featured', label: 'Show on the homepage', type: 'checkbox', help: 'The homepage shows the four most recent featured projects.' },
    ],
  },

  services: {
    title: 'Services',
    singular: 'service',
    description: 'What the studio offers. Shown on the homepage, the Services page, the footer and the contact form.',
    publicPath: (record) => `/services/${record.slug}`,
    searchKeys: ['title'],
    columns: [
      { label: '', render: (r) => <Thumb src={r.image} /> },
      { label: 'Order', render: (r) => r.order ?? '—' },
      { label: 'Title', render: (r) => <span className="font-semibold">{r.title}</span> },
      { label: 'Summary', render: (r) => <span className="line-clamp-2 max-w-md text-neutral-500">{r.shortDescription}</span> },
    ],
    defaults: { icon: 'sparkles', features: [], order: 10 },
    fields: [
      { name: 'title', label: 'Service name', type: 'text', required: true },
      { name: 'shortDescription', label: 'Short summary', type: 'textarea', rows: 2, required: true, help: 'One or two sentences, shown on cards.' },
      { name: 'description', label: 'Full description', type: 'textarea', rows: 8, required: true, help: BLANK_LINE_HELP },
      { name: 'features', label: 'What’s included', type: 'list', addLabel: 'Add feature' },
      { name: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS, required: true },
      { name: 'image', label: 'Banner photo', type: 'image', required: true },
      { name: 'order', label: 'Display order', type: 'number', help: 'Lower numbers come first.' },
    ],
  },

  testimonials: {
    title: 'Reviews',
    singular: 'review',
    description: 'Client reviews. Featured ones appear on the homepage.',
    searchKeys: ['name', 'location', 'projectType'],
    columns: [
      { label: '', render: (r) => (r.avatar ? <img src={r.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : null) },
      { label: 'Client', render: (r) => <span className="font-semibold">{r.name}</span> },
      { label: 'Project', render: (r) => [r.projectType, r.location].filter(Boolean).join(' · ') },
      {
        label: 'Rating',
        render: (r) => (
          <span className="flex items-center gap-1">
            {r.rating} <Star size={13} className="fill-brand-400 text-brand-400" />
          </span>
        ),
      },
      { label: 'Homepage', render: (r) => <Pill on={r.featured}>{r.featured ? 'Featured' : 'No'}</Pill> },
    ],
    defaults: { rating: 5, featured: false },
    fields: [
      { name: 'name', label: 'Client name', type: 'text', required: true },
      { name: 'projectType', label: 'Type of project', type: 'text', help: 'e.g. Apartment Interior' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'rating', label: 'Rating', type: 'select', options: [5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} star${n > 1 ? 's' : ''}` })), required: true },
      { name: 'message', label: 'What they said', type: 'textarea', rows: 5, required: true },
      { name: 'avatar', label: 'Client photo', type: 'image' },
      { name: 'featured', label: 'Show on the homepage', type: 'checkbox' },
    ],
  },

  blogs: {
    title: 'Journal',
    singular: 'article',
    description: 'Articles shown under “Journal”. The four newest appear on the homepage.',
    publicPath: (record) => `/journal/${record.slug}`,
    searchKeys: ['title', 'author'],
    columns: [
      { label: '', render: (r) => <Thumb src={r.coverImage} /> },
      { label: 'Title', render: (r) => <span className="font-semibold">{r.title}</span> },
      { label: 'Tags', render: (r) => (r.tags || []).join(', ') },
      { label: 'Published', render: (r) => formatDate(r.publishedAt) },
    ],
    defaults: { author: 'Nyulo Design Team', readTimeMinutes: 5, tags: [], publishedAt: new Date().toISOString().slice(0, 10) },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Summary', type: 'textarea', rows: 3, required: true, help: 'Shown on article cards.' },
      { name: 'content', label: 'Article text', type: 'textarea', rows: 14, required: true, help: BLANK_LINE_HELP },
      { name: 'coverImage', label: 'Cover photo', type: 'image', required: true },
      { name: 'tags', label: 'Tags', type: 'list', addLabel: 'Add tag' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'readTimeMinutes', label: 'Reading time (minutes)', type: 'number' },
      { name: 'publishedAt', label: 'Publish date', type: 'date' },
    ],
  },
};
