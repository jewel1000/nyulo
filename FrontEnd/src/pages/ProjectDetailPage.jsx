import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Ruler, CalendarDays, User, CheckCircle2, Expand, Images } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Button from '../components/common/Button.jsx';
import Lightbox from '../components/projects/Lightbox.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchProjectBySlug } from '../api/projects.api.js';

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-black/10 bg-ink-900 p-4">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        <Icon size={13} className="text-brand-400" /> {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-cream-50">{value}</p>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: project, loading, error, refetch } = useFetch(() => fetchProjectBySlug(slug), [slug]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error) return <div className="pt-32"><ErrorState error={error} onRetry={refetch} /></div>;
  if (!project) return null;

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden pb-20 pt-44">
        <img src={project.coverImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        <Container className="relative">
          <Link to="/work" className="mb-6 inline-flex items-center gap-2 text-sm text-cream-100/80 transition hover:text-brand-400">
            <ArrowLeft size={15} /> Back to our work
          </Link>
          <span className="block w-fit rounded-full border border-brand-500/40 bg-ink-950/60 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300 backdrop-blur">
            {project.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
            {project.title}
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          {/* Description + gallery */}
          <div>
            <Reveal className="space-y-5 text-sm leading-relaxed text-ink-300 sm:text-base">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>
            {project.images?.length > 0 && (
              <>
                <div className="mt-12 flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold text-cream-50">Photo Gallery</h2>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-cream-50 transition hover:border-brand-500 hover:text-brand-400"
                  >
                    <Images size={14} /> View all {project.images.length} photos
                  </button>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {project.images.map((image, index) => (
                    <Reveal key={image} delay={(index % 4) * 70} className={index === 0 ? 'sm:col-span-2' : ''}>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        aria-label={`Open photo ${index + 1} full screen`}
                        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-black/10"
                      >
                        <img
                          src={image}
                          alt={`${project.title} — view ${index + 1}`}
                          loading="lazy"
                          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
                        />
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/90 text-cream-50 opacity-0 shadow transition group-hover:opacity-100">
                          <Expand size={15} />
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Facts + scope */}
          <div className="space-y-6">
            <Reveal className="grid grid-cols-2 gap-4">
              <Fact icon={MapPin} label="Location" value={project.location} />
              <Fact icon={Ruler} label="Area" value={`${project.areaSqft?.toLocaleString()} sqft`} />
              <Fact icon={CalendarDays} label="Year" value={project.year} />
              <Fact icon={User} label="Client" value={project.client || 'Private'} />
            </Reveal>
            {project.scope?.length > 0 && (
              <Reveal delay={100}>
                <div className="rounded-2xl border border-black/10 bg-ink-900 p-7">
                  <h2 className="font-display text-xl font-semibold text-cream-50">Scope of Work</h2>
                  <ul className="mt-5 space-y-3">
                    {project.scope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-cream-100/85">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" className="mt-7 w-full">Plan a Similar Project</Button>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>
      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          title={project.title}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
