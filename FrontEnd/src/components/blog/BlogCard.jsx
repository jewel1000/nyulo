import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { formatDate } from '../../utils/format.js';

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/journal/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-ink-900 transition hover:border-brand-500/30"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-400">
          <span>{formatDate(blog.publishedAt)}</span>
          <span className="text-brand-500">•</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {blog.readTimeMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-cream-50 transition group-hover:text-brand-300">
          {blog.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300 line-clamp-3">{blog.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/15 px-2.5 py-0.5 text-[11px] text-ink-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
