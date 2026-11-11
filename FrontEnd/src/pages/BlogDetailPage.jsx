import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CalendarDays, UserRound } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchBlogBySlug } from '../api/blogs.api.js';
import { formatDate } from '../utils/format.js';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: blog, loading, error, refetch } = useFetch(() => fetchBlogBySlug(slug), [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error) return <div className="pt-32"><ErrorState error={error} onRetry={refetch} /></div>;
  if (!blog) return null;

  return (
    <>
      <article className="pb-20 pt-36">
        <Container className="max-w-3xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-ink-300 transition hover:text-brand-400">
            <ArrowLeft size={15} /> All articles
          </Link>

          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-brand-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-white/10 pb-8 text-xs text-ink-300">
            <span className="flex items-center gap-1.5"><UserRound size={13} className="text-brand-400" /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-brand-400" /> {formatDate(blog.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-brand-400" /> {blog.readTimeMinutes} min read</span>
          </div>

          <img src={blog.coverImage} alt={blog.title} className="mt-10 w-full rounded-2xl border border-white/5 object-cover" />

          <Reveal className="mt-10 space-y-6 text-base leading-[1.85] text-cream-100/85">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </article>
      <CtaBanner />
    </>
  );
}
