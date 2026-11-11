/**
 * Demo content used to seed MongoDB on first run and to power the
 * in-memory fallback when the database is unavailable.
 */

const img = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects = [
  {
    title: 'Serene Duplex Residence',
    slug: 'serene-duplex-residence',
    category: 'Duplex & Triplex',
    location: 'Bashundhara R/A, Dhaka',
    areaSqft: 3200,
    year: 2025,
    client: 'Private Client',
    description:
      'A full turnkey interior for a 3,200 sqft duplex that balances warm minimalism with Bangladeshi craftsmanship. The double-height living space is anchored by a sculptural wooden staircase, while bespoke teak joinery, layered lighting and a muted palette of ivory, walnut and brass create a calm, timeless home for a family of five.',
    scope: ['Space planning', 'Custom furniture', 'Lighting design', 'False ceiling', 'Turnkey execution'],
    coverImage: img('photo-1600210492486-724fe5c67fb0'),
    images: [img('photo-1600210492486-724fe5c67fb0'), img('photo-1586023492125-27b2c045efd7'), img('photo-1616486338812-3dadae4b4ace')],
    featured: true,
  },
  {
    title: 'Luxe Lakeview Apartment',
    slug: 'luxe-lakeview-apartment',
    category: 'Residential',
    location: 'Mohammadpur, Dhaka',
    areaSqft: 1850,
    year: 2025,
    client: 'Private Client',
    description:
      'A 1,850 sqft apartment transformed into a contemporary sanctuary. We opened up the living and dining zones, introduced a feature wall of fluted panels and warm cove lighting, and designed every piece of furniture to maximize storage without visual clutter. The result is a bright, airy home that photographs like a boutique hotel.',
    scope: ['Concept design', '3D visualization', 'Custom furniture', 'Soft furnishing', 'Decor styling'],
    coverImage: img('photo-1600566753086-00f18fb6b3ea'),
    images: [img('photo-1600566753086-00f18fb6b3ea'), img('photo-1522708323590-d24dbb6b0267'), img('photo-1616594039964-ae9021a400a0')],
    featured: true,
  },
  {
    title: 'Horizon Corporate Office',
    slug: 'horizon-corporate-office',
    category: 'Office',
    location: 'Motijheel C/A, Dhaka',
    areaSqft: 5500,
    year: 2024,
    client: 'Horizon Group',
    description:
      'A 5,500 sqft headquarters designed around hybrid work: open collaboration zones, acoustic meeting pods, a café-style breakout area and a reception that makes the brand tangible the moment you step in. Ergonomic workstations and layered acoustic treatment keep the floor productive even at full capacity.',
    scope: ['Workplace strategy', 'MEP coordination', 'Acoustic design', 'Branding integration', 'Turnkey fit-out'],
    coverImage: img('photo-1497366754035-f200968a6e72'),
    images: [img('photo-1497366754035-f200968a6e72'), img('photo-1497366811353-6870744d04b2'), img('photo-1497215842964-222b430dc094')],
    featured: true,
  },
  {
    title: 'Aurora Flagship Showroom',
    slug: 'aurora-flagship-showroom',
    category: 'Commercial & Retail',
    location: 'Uttara Sector 7, Dhaka',
    areaSqft: 2800,
    year: 2024,
    client: 'Aurora Lifestyle',
    description:
      'A flagship retail experience where the architecture sells as hard as the products. Dramatic spot lighting, a sculpted ceiling ribbon and modular display systems let the brand refresh collections overnight, while a curated customer journey quietly guides visitors from window to checkout.',
    scope: ['Retail planning', 'Visual merchandising', 'Lighting design', 'Custom displays', 'Signage'],
    coverImage: img('photo-1441986300917-64674bd600d8'),
    images: [img('photo-1441986300917-64674bd600d8'), img('photo-1567401893414-76b7b1e5a7a5'), img('photo-1555529669-e69e7aa0ba9a')],
    featured: true,
  },
  {
    title: 'Maison Café & Dine',
    slug: 'maison-cafe-and-dine',
    category: 'Restaurant & Café',
    location: 'Khilgaon, Dhaka',
    areaSqft: 1800,
    year: 2024,
    client: 'Maison Hospitality',
    description:
      'An 70-cover café and restaurant with the warmth of a Parisian bistro and the durability a busy Dhaka food destination demands. Terracotta tones, rattan textures, a statement bar counter and Instagram-ready corners drive dwell time and repeat visits, while the kitchen workflow was planned seat-by-seat with the operator.',
    scope: ['Concept & mood', 'Kitchen workflow', 'Furniture & joinery', 'Lighting design', 'Branding corners'],
    coverImage: img('photo-1517248135467-4c7edcad34c4'),
    images: [img('photo-1517248135467-4c7edcad34c4'), img('photo-1555396273-367ea4eb4db5'), img('photo-1559339352-11d035aa65de')],
    featured: true,
  },
  {
    title: 'Minimal Nest Apartment',
    slug: 'minimal-nest-apartment',
    category: 'Residential',
    location: 'Aftabnagar, Dhaka',
    areaSqft: 1450,
    year: 2023,
    client: 'Private Client',
    description:
      'Proof that a modest 1,450 sqft flat can feel twice its size. Every wall, wardrobe and bed was designed as storage-first; a mirror-and-light strategy stretches the perceived volume; and a restrained white-oak palette keeps the whole home serene. Delivered end-to-end in nine weeks.',
    scope: ['Space planning', 'Storage design', 'Modular furniture', 'Lighting', 'Styling'],
    coverImage: img('photo-1600607687939-ce8a6c25118c'),
    images: [img('photo-1600607687939-ce8a6c25118c'), img('photo-1600121848594-d8644e57abab'), img('photo-1600494603989-9650cf6ddd3d')],
    featured: true,
  },
  {
    title: 'Skyline Penthouse',
    slug: 'skyline-penthouse',
    category: 'Residential',
    location: 'Lalmatia, Dhaka',
    areaSqft: 2600,
    year: 2025,
    client: 'Private Client',
    description:
      'A penthouse that frames the Dhaka skyline as its artwork. Floor-to-ceiling sheers, a monolithic marble island, smart-home lighting scenes and a private lounge terrace come together in a composition of quiet luxury designed for entertaining.',
    scope: ['Interior architecture', 'Smart home integration', 'Marble & stonework', 'Terrace landscape', 'Art curation'],
    coverImage: img('photo-1512917774080-9991f1c4c750'),
    images: [img('photo-1512917774080-9991f1c4c750'), img('photo-1600585154340-be6161a56a0c'), img('photo-1631679706909-1844bbd07221')],
    featured: false,
  },
  {
    title: 'NovaTech Workspace',
    slug: 'novatech-workspace',
    category: 'Office',
    location: 'Kawran Bazar, Dhaka',
    areaSqft: 4200,
    year: 2023,
    client: 'NovaTech Ltd.',
    description:
      'A software company office engineered for focus and play in equal measure: sound-insulated engineering bays, writable glass walls, a town-hall amphitheater and a gaming lounge. Material choices were made for a 10-year lifecycle, keeping the total cost of ownership low.',
    scope: ['Workplace strategy', 'Acoustic engineering', 'Custom workstations', 'Breakout zones', 'Wayfinding'],
    coverImage: img('photo-1524758631624-e2822e304c36'),
    images: [img('photo-1524758631624-e2822e304c36'), img('photo-1497366216548-37526070297c'), img('photo-1504384308090-c894fdcc538d')],
    featured: false,
  },
];

export const services = [
  {
    title: 'Residential Interiors',
    slug: 'residential-interiors',
    icon: 'home',
    order: 1,
    shortDescription:
      'Apartments, duplexes and full homes designed around how your family actually lives — from concept to turnkey handover.',
    description:
      'Your home should be the most personal space you own. We begin with how you live — your routines, your storage, your light — and design every room around it.\n\nThe engagement covers space planning, custom furniture and joinery, false ceilings, lighting design, soft furnishing and decor styling. You approve photorealistic 3D views of every room before a single board is cut.\n\nOur in-house execution team then delivers the design as drawn: one contract, one timeline, and a dedicated project manager who sends you progress updates until handover day.',
    features: [
      'Full space planning & layouts',
      'Photorealistic 3D before execution',
      'Custom furniture & joinery',
      'Lighting & false ceiling design',
      'Material & color consultation',
      'Turnkey execution & handover',
    ],
    image: img('photo-1616486338812-3dadae4b4ace'),
  },
  {
    title: 'Commercial & Office Interiors',
    slug: 'commercial-office-interiors',
    icon: 'building',
    order: 2,
    shortDescription:
      'Offices, showrooms, restaurants and retail spaces that work as hard as your business — on brand, on budget, on time.',
    description:
      'Commercial interiors are business tools. A well-planned office lifts productivity and retention; a well-designed showroom lifts sales per square foot.\n\nWe handle workplace strategy, zoning, MEP coordination, acoustic treatment, brand integration and furniture specification — then execute with minimal disruption to your operations, including phased and after-hours fit-outs.\n\nFrom 1,000 sqft startup offices to multi-floor corporate headquarters, every project ships with as-built drawings and a maintenance guide.',
    features: [
      'Workplace strategy & zoning',
      'Brand-integrated design',
      'MEP & acoustic coordination',
      'Restaurant & retail planning',
      'Phased execution for live offices',
      'As-built documentation',
    ],
    image: img('photo-1497366811353-6870744d04b2'),
  },
  {
    title: '3D Visualization',
    slug: '3d-visualization',
    icon: 'box',
    order: 3,
    shortDescription:
      'Photorealistic renders and walkthroughs that let you see — and refine — your space before construction begins.',
    description:
      'Changing a wall in a render costs nothing; changing it on site costs lakhs. Our visualization studio produces photorealistic stills, 360° panoramas and animated walkthroughs for every design we create.\n\nWe also work as a standalone render partner for architects, developers and overseas clients who need marketing-grade imagery for sales galleries and pre-launch campaigns.\n\nEvery camera angle is art-directed: accurate materials, true-to-life lighting and styling that makes the design decision easy.',
    features: [
      'Photorealistic interior renders',
      '360° panorama experiences',
      'Animated walkthrough videos',
      'Marketing visuals for developers',
      'Fast revision cycles',
      'VR-ready outputs on request',
    ],
    image: img('photo-1600607687920-4e2a09cf159d'),
  },
  {
    title: 'Building Design & Construction',
    slug: 'building-design-construction',
    icon: 'hard-hat',
    order: 4,
    shortDescription:
      'Architectural design, structural coordination and construction management for residential and commercial buildings.',
    description:
      'For clients starting from bare land, we offer architecture and construction under the same roof as interior design — so the building and its interiors are conceived as one.\n\nServices span architectural concept and RAJUK-compliant drawings, structural and MEP coordination, BOQ preparation, contractor management and quality supervision through to handover.\n\nOne team owning the whole chain means fewer surprises, cleaner budgets and a building that matches its renders.',
    features: [
      'Architectural concept & drawings',
      'Approval & compliance support',
      'Structural & MEP coordination',
      'BOQ & budget planning',
      'Construction supervision',
      'Integrated interior handover',
    ],
    image: img('photo-1503387762-592deb58ef4e'),
  },
  {
    title: 'Landscape Design',
    slug: 'landscape-design',
    icon: 'trees',
    order: 5,
    shortDescription:
      'Rooftop gardens, courtyards and green terraces that bring usable outdoor living to dense city plots.',
    description:
      'In a city as dense as Dhaka, outdoor space is the ultimate luxury — and most of it sits unused on rooftops. We turn roofs, terraces and courtyards into genuinely livable rooms.\n\nDesigns combine hard landscape (decking, pergolas, water features, outdoor kitchens) with climate-appropriate soft landscape: native plants, low-maintenance greens and smart irrigation.\n\nEvery project is engineered first — waterproofing, drainage and load calculations — so the garden stays beautiful for years, not months.',
    features: [
      'Rooftop & terrace gardens',
      'Pergolas, decks & water features',
      'Native, low-maintenance planting',
      'Waterproofing & drainage engineering',
      'Outdoor lighting scenes',
      'Smart irrigation systems',
    ],
    image: img('photo-1416879595882-3373a0480b5b'),
  },
];

export const testimonials = [
  {
    name: 'Nusrat Jahan',
    location: 'Mohammadpur, Dhaka',
    projectType: 'Apartment Interior',
    avatar: img('photo-1494790108377-be9c29b29330', 300),
    rating: 5,
    message:
      'They understood our lifestyle before drawing a single line. The 3D designs matched the final output almost exactly, and the team handed over our apartment two days ahead of schedule. Guests refuse to believe this is the same flat we bought.',
    featured: true,
  },
  {
    name: 'Dr. Mahmudul Hasan',
    location: 'Bashundhara R/A, Dhaka',
    projectType: 'Duplex Interior',
    avatar: img('photo-1472099645785-5658abf4ff4e', 300),
    rating: 5,
    message:
      'A duplex is a complicated project, but their project manager kept everything — civil work, electrical, furniture — perfectly synchronized. Weekly photo updates meant I never had to visit the site unannounced. Completely stress-free.',
    featured: true,
  },
  {
    name: 'Farhana Rahman',
    location: 'Motijheel C/A, Dhaka',
    projectType: 'Corporate Office',
    avatar: img('photo-1438761681033-6461ffad8d80', 300),
    rating: 5,
    message:
      'Our new office was delivered while we kept operating from half the floor — phased execution with zero downtime. Candidates now mention the office in interviews. That is design paying for itself.',
    featured: true,
  },
  {
    name: 'Tanvir Ahmed',
    location: 'Khilgaon, Dhaka',
    projectType: 'Restaurant Interior',
    avatar: img('photo-1507003211169-0a1dd7228f2d', 300),
    rating: 5,
    message:
      'They designed our café like restaurateurs, not just designers — seating counts, kitchen workflow, even where people take photos. Revenue per table is up and the space still looks new after a year of heavy service.',
    featured: true,
  },
  {
    name: 'Sabrina Chowdhury',
    location: 'Aftabnagar, Dhaka',
    projectType: 'Apartment Interior',
    avatar: img('photo-1534528741775-53994a69daeb', 300),
    rating: 4,
    message:
      'We had a modest budget and they never made us feel small for it. Smart material choices gave us a premium look at a sensible cost, and the storage design doubled what our old furniture held.',
    featured: true,
  },
  {
    name: 'Rafiqul Islam',
    location: 'Kawran Bazar, Dhaka',
    projectType: 'Office Fit-out',
    avatar: img('photo-1500648767791-00dcc994a43e', 300),
    rating: 5,
    message:
      'The BOQ was transparent down to the hinge. No surprise bills, no vague line items. For a company that answers to a board, that level of documentation made the approval process painless.',
    featured: false,
  },
  {
    name: 'Ayesha Siddiqua',
    location: 'Mirpur, Dhaka',
    projectType: 'Home Interior',
    avatar: img('photo-1544005313-94ddf0286df2', 300),
    rating: 5,
    message:
      'From the first consultation to the final styling day, everything felt considered. They even restyled our old bookshelf pieces into the new design instead of pushing us to buy everything new.',
    featured: false,
  },
  {
    name: 'Imran Kabir',
    location: 'Uttara Sector 7, Dhaka',
    projectType: 'Showroom Design',
    avatar: img('photo-1506794778202-cad84cf45f1d', 300),
    rating: 5,
    message:
      'Footfall is the same street, the same brand — but conversions jumped noticeably after the redesign. The modular display system they built lets us refresh the whole showroom in one night.',
    featured: false,
  },
];

export const blogs = [
  {
    title: '10 Small Apartment Interior Ideas for Dhaka Homes',
    slug: '10-small-apartment-interior-ideas-dhaka',
    excerpt:
      'Most Dhaka apartments are between 1,000 and 1,500 sqft. Here are ten designer-approved ways to make a compact flat feel open, bright and twice as functional.',
    content:
      'Most apartments handed over in Dhaka today fall between 1,000 and 1,500 square feet — and with a growing family, every one of those feet has to earn its place. The good news: small does not have to mean cramped. The right design decisions can make a compact flat feel open, calm and genuinely luxurious.\n\nStart with storage that disappears. Beds with hydraulic lifts, window-side benches with drawers, and wardrobes that run wall-to-wall and floor-to-ceiling remove the need for loose cabinets that eat floor area. When storage is architectural, rooms stay visually quiet.\n\nNext, work with light. Mirrors placed opposite windows double the daylight a room receives. Light wall tones — warm whites, soft greiges — reflect rather than absorb, and cove lighting at the ceiling line lifts the perceived height of a standard 9.5-foot slab.\n\nZone, don’t wall. Instead of brick partitions, use open shelving, slatted wood screens or a change in flooring to separate dining from living. Sightlines stay long, and long sightlines read as space.\n\nFinally, commit to a restrained palette: two base tones, one accent, repeated everywhere. The fastest way to shrink a small flat is to fill it with ten competing colors and materials. Discipline, more than budget, is what makes small apartments photograph like magazine spreads.',
    coverImage: img('photo-1600121848594-d8644e57abab'),
    tags: ['Residential', 'Small Spaces', 'Tips'],
    author: 'Nyulo Design Team',
    readTimeMinutes: 6,
    publishedAt: new Date('2026-09-14'),
  },
  {
    title: 'How Much Does Interior Design Cost in Bangladesh? (2026 Guide)',
    slug: 'interior-design-cost-bangladesh-2026',
    excerpt:
      'From 1,500 to 4,000+ BDT per square foot — a transparent breakdown of what drives interior costs in Bangladesh and how to budget for your project.',
    content:
      'The first question every client asks is the honest one: what will it cost? In 2026, full interior work in Bangladesh typically ranges from around 1,500 BDT per square foot for an essential package to 4,000+ BDT for luxury turnkey work. Here is what actually moves that number.\n\nMaterials dominate. Board quality (local versus imported marine board), veneer versus laminate, local versus imported hardware — these choices alone can swing a wardrobe’s price by 60%. A good designer specifies where premium materials matter (kitchens, high-touch surfaces) and where smart alternatives perform identically.\n\nScope is the second lever. "Interior design" can mean paint and curtains, or it can mean false ceilings, full custom furniture, electrical rerouting and smart lighting. Define the scope room by room before comparing quotations — an apples-to-apples BOQ protects you from lowball bids that balloon mid-project.\n\nLabor and finishing quality are where cheap quotes die. Precision edge-banding, hairline joints and dust-free lacquer booths cost more than roadside carpentry, and the difference is visible within a year.\n\nOur advice: fix your total budget first, share it openly with your designer, and ask for a package designed to that number. Transparency on both sides is the single biggest cost-saver in this industry.',
    coverImage: img('photo-1554224155-6726b3ff858f'),
    tags: ['Budget', 'Guide'],
    author: 'Nyulo Design Team',
    readTimeMinutes: 7,
    publishedAt: new Date('2026-08-02'),
  },
  {
    title: 'Choosing the Right Color Palette for Your Living Room',
    slug: 'choosing-color-palette-living-room',
    excerpt:
      'A living room’s palette sets the mood for the whole home. Here is the simple 60-30-10 framework our designers use on every project.',
    content:
      'Color is the cheapest transformation in interior design and the easiest to get wrong. The living room, as the most public room of the home, deserves a deliberate palette rather than a collection of accidents.\n\nOur studio works with the classic 60-30-10 rule. Sixty percent of the room — walls, large rugs, main sofa — carries the dominant tone, usually a warm neutral. Thirty percent — curtains, accent chairs, wood tones — carries the secondary color that gives the room its character. The final ten percent is the accent: cushions, art, a single bold lamp.\n\nIn Bangladesh’s light, warm neutrals outperform cold greys. Our afternoon sun is golden; grey walls turn muddy by 4 pm, while ivory, sand and clay tones glow. If you love deeper shades, hold them for a single feature wall away from the main window.\n\nTest before you commit. Paint a one-meter square of your shortlisted color on two different walls and watch it across a full day — morning, noon and under artificial evening light. A color that survives all three is a keeper.\n\nFinally, let materials be part of the palette. Walnut veneer, brass handles, cane webbing and green plants all count as colors. Often the most sophisticated rooms have quiet painted walls and let the materials do the talking.',
    coverImage: img('photo-1586023492125-27b2c045efd7'),
    tags: ['Tips', 'Color'],
    author: 'Nyulo Design Team',
    readTimeMinutes: 5,
    publishedAt: new Date('2026-06-21'),
  },
  {
    title: 'Office Interior Trends to Watch in 2026',
    slug: 'office-interior-trends-2026',
    excerpt:
      'Hybrid work has permanently changed what offices are for. These are the five trends defining high-performing workplaces in 2026.',
    content:
      'The office did not die — it changed jobs. In 2026, companies are designing workplaces that earn the commute: spaces for collaboration, culture and focus that a home desk cannot match.\n\nFirst, destination collaboration. The ratio of individual desks to collaborative seats keeps falling. Teams come in to work together, so writable walls, reconfigurable furniture and generous project rooms now sit at the center of the plan, not its edges.\n\nSecond, acoustic zoning. Open plans failed when everyone could hear everyone. Modern offices layer quiet libraries, phone pods and buzz-friendly café zones, letting people choose their soundtrack.\n\nThird, biophilia that is more than a plant shelf. Daylight-first planning, living walls and natural materials measurably reduce stress and sick days — and signal care to candidates during hiring.\n\nFourth, brand-embedded environments. The office has become a marketing asset: clients tour it, recruits judge it, employees post it. Reception areas, feature walls and even meeting room names now carry deliberate brand storytelling.\n\nFinally, lifecycle thinking. Companies are specifying furniture and finishes on a 10-year total cost of ownership, not the cheapest first bid. Durable, repairable and modular wins — for the budget and the planet alike.',
    coverImage: img('photo-1497366216548-37526070297c'),
    tags: ['Commercial', 'Trends'],
    author: 'Nyulo Design Team',
    readTimeMinutes: 6,
    publishedAt: new Date('2026-05-10'),
  },
];
