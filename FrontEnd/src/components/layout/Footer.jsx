import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../../constants/index.js';
import { useSite } from '../../context/SiteContext.jsx';
import useFetch from '../../hooks/useFetch.js';
import { fetchServices } from '../../api/services.api.js';
import Logo from '../common/Logo.jsx';

export default function Footer() {
  const { company: COMPANY } = useSite();
  const { data: services } = useFetch(fetchServices, []);

  const SOCIALS = [
    { icon: Facebook, href: COMPANY.facebook, label: 'Facebook' },
    { icon: Instagram, href: COMPANY.instagram, label: 'Instagram' },
    { icon: Linkedin, href: COMPANY.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: COMPANY.youtube, label: 'YouTube' },
  ].filter((social) => social.href);

  return (
    <footer className="border-t border-black/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Logo size={44} />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">
            {COMPANY.tagline}. {COMPANY.footerText}
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
            {(services || []).map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="transition hover:text-cream-50">
                  {service.title}
                </Link>
              </li>
            ))}
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
          <p>{COMPANY.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
