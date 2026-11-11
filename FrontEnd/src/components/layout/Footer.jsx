import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '../../constants/index.js';

const SOCIALS = [
  { icon: Facebook, href: COMPANY.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
  { icon: Linkedin, href: COMPANY.social.linkedin, label: 'LinkedIn' },
  { icon: Youtube, href: COMPANY.social.youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl font-semibold text-cream-50">
            Nyulo<span className="text-brand-400"> Interior</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">
            {COMPANY.tagline}. An interior design and build studio based in Mirpur, Dhaka —
            crafting homes and workplaces since {COMPANY.founded}.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-black/15 p-2 text-ink-300 transition hover:border-brand-500 hover:text-brand-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-400">Pages</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-ink-300 transition hover:text-cream-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-400">What We Do</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-300">
            <li><Link to="/services/home-interiors" className="transition hover:text-cream-50">Home Interiors</Link></li>
            <li><Link to="/services/modular-kitchens-wardrobes" className="transition hover:text-cream-50">Kitchens &amp; Wardrobes</Link></li>
            <li><Link to="/services/workspace-design" className="transition hover:text-cream-50">Workspace Design</Link></li>
            <li><Link to="/services/restaurant-retail-interiors" className="transition hover:text-cream-50">Restaurant &amp; Retail</Link></li>
            <li><Link to="/services/custom-furniture" className="transition hover:text-cream-50">Custom Furniture</Link></li>
            <li><Link to="/services/renovation-makeovers" className="transition hover:text-cream-50">Renovation &amp; Makeovers</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-400">Visit or Call</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
              {COMPANY.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-brand-400" />
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="transition hover:text-cream-50">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-brand-400" />
              <a href={`mailto:${COMPANY.email}`} className="transition hover:text-cream-50">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-ink-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>{COMPANY.tagline} — Mirpur, Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
