/**
 * Demo content used to seed MongoDB on first run and to power the
 * in-memory fallback when the database is unavailable.
 */

const img = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects = [
  {
    title: 'Serene Duplex Residence',
    slug: 'serene-duplex-residence',
    category: 'Penthouse & Duplex',
    location: 'Bashundhara R/A, Dhaka',
    areaSqft: 3200,
    year: 2025,
    client: 'Private Client',
    description:
      'A full turnkey interior for a 3,200 sqft duplex that balances warm minimalism with Bangladeshi craftsmanship. The double-height living space is anchored by a sculptural wooden staircase, while bespoke teak joinery, layered lighting and a muted palette of ivory, walnut and brass create a calm, timeless home for a family of five.',
    scope: ['Space planning', 'Custom furniture', 'Lighting design', 'False ceiling', 'Turnkey execution'],
    coverImage: img('photo-1600210492486-724fe5c67fb0'),
    images: [
      img('photo-1600210492486-724fe5c67fb0'),
      img('photo-1586023492125-27b2c045efd7'),
      img('photo-1616486338812-3dadae4b4ace'),
      img('photo-1600210491892-03d54c0aaf87'),
      img('photo-1617806118233-18e1de247200'),
      img('photo-1615874959474-d609969a20ed'),
      img('photo-1600566752355-35792bedcfea'),
    ],
    featured: false,
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
    images: [
      img('photo-1600566753086-00f18fb6b3ea'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1616594039964-ae9021a400a0'),
      img('photo-1615529182904-14819c35db37'),
      img('photo-1618219908412-a29a1bb7b86e'),
      img('photo-1540518614846-7eded433c457'),
      img('photo-1584622650111-993a426fbf0a'),
    ],
    featured: false,
  },
  {
    title: 'Horizon Corporate Office',
    slug: 'horizon-corporate-office',
    category: 'Workspace',
    location: 'Motijheel C/A, Dhaka',
    areaSqft: 5500,
    year: 2024,
    client: 'Horizon Group',
    description:
      'A 5,500 sqft headquarters designed around hybrid work: open collaboration zones, acoustic meeting pods, a café-style breakout area and a reception that makes the brand tangible the moment you step in. Ergonomic workstations and layered acoustic treatment keep the floor productive even at full capacity.',
    scope: ['Workplace strategy', 'MEP coordination', 'Acoustic design', 'Branding integration', 'Turnkey fit-out'],
    coverImage: img('photo-1497366754035-f200968a6e72'),
    images: [
      img('photo-1497366754035-f200968a6e72'),
      img('photo-1497366811353-6870744d04b2'),
      img('photo-1497215842964-222b430dc094'),
      img('photo-1556761175-4b46a572b786'),
      img('photo-1462826303086-329426d1aef5'),
      img('photo-1570126618953-d437176e8c79'),
    ],
    featured: false,
  },
  {
    title: 'Walnut & White Kitchen',
    slug: 'walnut-and-white-kitchen',
    category: 'Kitchen & Wardrobe',
    location: 'Uttara Sector 7, Dhaka',
    areaSqft: 240,
    year: 2025,
    client: 'Private Client',
    description:
      'A cramped, dark kitchen rebuilt as the brightest room in the flat. White lacquer upper cabinets keep the space light, walnut-finish base units add warmth, and a breakfast counter with stools turns the kitchen into a place to sit and talk. Everything was built in our workshop and installed in four days.',
    scope: ['Kitchen layout', 'Modular cabinetry', 'Quartz countertop', 'Chimney & hob installation', 'Under-cabinet lighting'],
    coverImage: img('photo-1484154218962-a197022b5858'),
    images: [
      img('photo-1484154218962-a197022b5858'),
      img('photo-1556911220-bff31c812dba'),
      img('photo-1600585152220-90363fe7e115'),
      img('photo-1556909212-d5b604d0c90d'),
      img('photo-1556909172-54557c7e4fb7'),
      img('photo-1556912167-f556f1f39fdf'),
    ],
    featured: true,
  },
  {
    title: 'Maison Café & Dine',
    slug: 'maison-cafe-and-dine',
    category: 'Hospitality & Retail',
    location: 'Khilgaon, Dhaka',
    areaSqft: 1800,
    year: 2024,
    client: 'Maison Hospitality',
    description:
      'An 70-cover café and restaurant with the warmth of a Parisian bistro and the durability a busy Dhaka food destination demands. Terracotta tones, rattan textures, a statement bar counter and Instagram-ready corners drive dwell time and repeat visits, while the kitchen workflow was planned seat-by-seat with the operator.',
    scope: ['Concept & mood', 'Kitchen workflow', 'Furniture & joinery', 'Lighting design', 'Branding corners'],
    coverImage: img('photo-1517248135467-4c7edcad34c4'),
    images: [
      img('photo-1517248135467-4c7edcad34c4'),
      img('photo-1555396273-367ea4eb4db5'),
      img('photo-1559339352-11d035aa65de'),
      img('photo-1552566626-52f8b828add9'),
      img('photo-1554118811-1e0d58224f24'),
      img('photo-1521017432531-fbd92d768814'),
      img('photo-1445116572660-236099ec97a0'),
    ],
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
    images: [
      img('photo-1600607687939-ce8a6c25118c'),
      img('photo-1600121848594-d8644e57abab'),
      img('photo-1600494603989-9650cf6ddd3d'),
      img('photo-1583847268964-b28dc8f51f92'),
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1522771739844-6a9f6d5f14af'),
      img('photo-1552321554-5fefe8c9ef14'),
    ],
    featured: false,
  },
  {
    title: 'Skyline Penthouse',
    slug: 'skyline-penthouse',
    category: 'Penthouse & Duplex',
    location: 'Lalmatia, Dhaka',
    areaSqft: 2600,
    year: 2025,
    client: 'Private Client',
    description:
      'A penthouse that frames the Dhaka skyline as its artwork. Floor-to-ceiling sheers, a monolithic marble island, smart-home lighting scenes and a private lounge terrace come together in a composition of quiet luxury designed for entertaining.',
    scope: ['Interior architecture', 'Smart home integration', 'Marble & stonework', 'Terrace landscape', 'Art curation'],
    coverImage: img('photo-1512917774080-9991f1c4c750'),
    images: [
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1631679706909-1844bbd07221'),
      img('photo-1616137466211-f939a420be84'),
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1505693416388-ac5ce068fe85'),
      img('photo-1565183997392-2f6f122e5912'),
    ],
    featured: true,
  },
  {
    title: 'NovaTech Workspace',
    slug: 'novatech-workspace',
    category: 'Workspace',
    location: 'Kawran Bazar, Dhaka',
    areaSqft: 4200,
    year: 2023,
    client: 'NovaTech Ltd.',
    description:
      'A software company office engineered for focus and play in equal measure: sound-insulated engineering bays, writable glass walls, a town-hall amphitheater and a gaming lounge. Material choices were made for a 10-year lifecycle, keeping the total cost of ownership low.',
    scope: ['Workplace strategy', 'Acoustic engineering', 'Custom workstations', 'Breakout zones', 'Wayfinding'],
    coverImage: img('photo-1524758631624-e2822e304c36'),
    images: [
      img('photo-1524758631624-e2822e304c36'),
      img('photo-1497366216548-37526070297c'),
      img('photo-1504384308090-c894fdcc538d'),
      img('photo-1527192491265-7e15c55b1ed2'),
      img('photo-1564069114553-7215e1ff1890'),
      img('photo-1604328698692-f76ea9498e76'),
    ],
    featured: true,
  },
];

export const services = [
  {
    title: 'Home Interiors',
    slug: 'home-interiors',
    icon: 'home',
    order: 1,
    shortDescription:
      'Flats, duplexes and penthouses planned room by room around your family, your storage and your daily routine.',
    description:
      'A home works when it fits the way you actually live. We start with a walk-through of your routines — who cooks, where the children study, how much you store — and plan every room around that.\n\nThe work covers layouts, false ceilings, lighting, wall finishes, built-in storage and soft furnishing. Before anything is built you see every room in 3D and approve it.\n\nOur own workshop and site team then carry it through to the last cushion, with one project manager as your single point of contact.',
    features: [
      'Room-by-room layout planning',
      '3D views of every room before work starts',
      'False ceiling & lighting design',
      'Built-in storage planning',
      'Paint, wallpaper & finish selection',
      'Soft furnishing & final styling',
    ],
    image: img('photo-1503174971373-b1f69850bded'),
  },
  {
    title: 'Modular Kitchens & Wardrobes',
    slug: 'modular-kitchens-wardrobes',
    icon: 'kitchen',
    order: 2,
    shortDescription:
      'Made-to-measure kitchens and wardrobes built in our workshop — moisture-safe boards, soft-close fittings, clean installs.',
    description:
      'Kitchens and wardrobes take the hardest daily use in any home, so we build them in our own workshop rather than on site. That means precise cuts, sealed edges and a far quicker, cleaner installation.\n\nWe plan kitchens around the cooking triangle and Bangladeshi cooking habits: proper exhaust, heat-safe countertops, and storage for large pots and spice racks. Wardrobes get internal layouts designed for what you actually own.\n\nYou choose from marine-grade board, lacquer, laminate or veneer finishes, with a written warranty on carcass and hardware.',
    features: [
      'Kitchen layouts planned for local cooking',
      'Marine-grade, moisture-resistant boards',
      'Soft-close hinges & drawer systems',
      'Chimney & countertop coordination',
      'Walk-in and sliding wardrobes',
      'Written warranty on carcass & hardware',
    ],
    image: img('photo-1556911220-bff31c812dba'),
  },
  {
    title: 'Workspace Design',
    slug: 'workspace-design',
    icon: 'briefcase',
    order: 3,
    shortDescription:
      'Offices that help teams focus, meet and grow — planned for headcount, acoustics and your brand.',
    description:
      'A good office is planned before it is decorated. We start with your headcount today and in three years, how teams collaborate, and how much privacy each role needs.\n\nFrom there we zone the floor into focus areas, meeting rooms and breakout space, sort out acoustics and cabling, and bring your brand into the reception and key walls.\n\nFor businesses that cannot pause, we phase the work or run it after hours so your team keeps working throughout.',
    features: [
      'Headcount & growth planning',
      'Meeting rooms & focus zones',
      'Acoustic treatment',
      'Data, power & lighting layout',
      'Brand walls & reception design',
      'Phased or after-hours execution',
    ],
    image: img('photo-1497366811353-6870744d04b2'),
  },
  {
    title: 'Restaurant & Retail Interiors',
    slug: 'restaurant-retail-interiors',
    icon: 'store',
    order: 4,
    shortDescription:
      'Cafés, restaurants and shops designed around how customers move, sit, browse and buy.',
    description:
      'In a restaurant or shop, the interior is part of the business model. We plan seating counts, kitchen flow and customer paths alongside the look, so the space earns as well as it photographs.\n\nFor food businesses we coordinate kitchen equipment, exhaust and service routes. For retail we plan display systems, lighting that flatters the product and a layout that guides people to the till.\n\nMaterials are chosen to survive heavy daily use and easy cleaning, not just opening day.',
    features: [
      'Seating & table-turn planning',
      'Kitchen & service flow',
      'Display & shelving systems',
      'Feature lighting',
      'Signage & photo-friendly corners',
      'Hard-wearing, easy-clean materials',
    ],
    image: img('photo-1555396273-367ea4eb4db5'),
  },
  {
    title: 'Custom Furniture',
    slug: 'custom-furniture',
    icon: 'armchair',
    order: 5,
    shortDescription:
      'Sofas, beds, dining sets and TV units made to your size and finish in our own workshop.',
    description:
      'Ready-made furniture rarely fits Dhaka flats perfectly. We design and build pieces to the exact size of your room, in the wood, fabric and finish you choose.\n\nEvery piece starts with a drawing and a material sample for your approval. We use seasoned wood, kiln-dried where needed, and upholstery fabrics rated for daily use.\n\nOrder a single statement piece or furnish a whole home — either way it is delivered and installed by our own team.',
    features: [
      'Made to the exact size of your room',
      'Drawing & sample approval first',
      'Seasoned & kiln-dried wood',
      'Upholstery fabric library',
      'Single pieces or full-home sets',
      'Delivery & installation included',
    ],
    image: img('photo-1555041469-a586c61ea9bc'),
  },
  {
    title: 'Renovation & Makeovers',
    slug: 'renovation-makeovers',
    icon: 'hammer',
    order: 6,
    shortDescription:
      'Refresh an older flat or office — flooring, bathrooms, lighting and finishes — without starting from scratch.',
    description:
      'Not every project needs a full fit-out. Many older flats only need new flooring, updated bathrooms, better lighting and a fresh colour scheme to feel completely new.\n\nWe assess what can stay, what should be repaired and what is worth replacing, then give you options at different budgets.\n\nWork is scheduled room by room where possible, so you can keep living in the home while we renovate.',
    features: [
      'Site survey & condition report',
      'Flooring & tiling replacement',
      'Bathroom upgrades',
      'Electrical & lighting refresh',
      'Repaint & new finishes',
      'Room-by-room scheduling',
    ],
    image: img('photo-1581858726788-75bc0f6a952d'),
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
    projectType: 'Kitchen Makeover',
    avatar: img('photo-1506794778202-cad84cf45f1d', 300),
    rating: 5,
    message:
      'Our old kitchen had no storage and no light. Now it is the room everyone gathers in. The cabinets were built in their workshop and fitted in four days with almost no mess.',
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
