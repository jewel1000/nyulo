import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../../utils/iconMap.js';

export default function ServiceCard({ service }) {
  const Icon = getIcon(service.icon);
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/5 bg-ink-900 p-7 transition hover:-translate-y-1 hover:border-brand-500/40"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-ink-950">
        <Icon size={22} />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-cream-50">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-300">{service.shortDescription}</p>
      <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-400">
        Learn more
        <ArrowRight size={15} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
