import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-ink-900"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="mb-2 inline-block rounded-full border border-brand-500/40 bg-ink-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-300 backdrop-blur">
          {project.category}
        </span>
        <h3 className="font-display text-xl font-semibold text-cream-50 transition group-hover:text-brand-300">
          {project.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-300">
          <MapPin size={12} className="text-brand-400" />
          {project.location} · {project.areaSqft?.toLocaleString()} sqft
        </p>
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-brand-500 p-2 opacity-0 transition group-hover:opacity-100">
        <ArrowUpRight size={16} className="text-ink-950" />
      </div>
    </Link>
  );
}
