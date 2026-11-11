import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-ink-950 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-400 backdrop-blur">
          {project.category}
        </span>
        <div className="absolute right-4 top-4 rounded-full bg-brand-500 p-2 opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={16} className="text-ink-950" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-cream-50 transition group-hover:text-brand-400">
          {project.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-300">
          <MapPin size={12} className="text-brand-400" />
          {project.location} · {project.areaSqft?.toLocaleString()} sqft
        </p>
      </div>
    </Link>
  );
}
