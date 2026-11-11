import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Phone } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Button from '../components/common/Button.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchServiceBySlug } from '../api/services.api.js';
import { getIcon } from '../utils/iconMap.js';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { data: service, loading, error, refetch } = useFetch(() => fetchServiceBySlug(slug), [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error) return <div className="pt-32"><ErrorState error={error} onRetry={refetch} /></div>;
  if (!service) return null;

  const Icon = getIcon(service.icon);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <img src={service.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink-950/85" />
        <Container className="relative">
          <Link to="/services" className="mb-6 inline-flex items-center gap-2 text-sm text-ink-300 transition hover:text-brand-400">
            <ArrowLeft size={15} /> All services
          </Link>
          <div className="flex items-start gap-5">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 sm:flex">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="font-display text-4xl font-semibold text-cream-50 sm:text-5xl">{service.title}</h1>
              <p className="mt-3 max-w-2xl text-base text-cream-100/80">{service.shortDescription}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-5 text-sm leading-relaxed text-ink-300 sm:text-base">
            {service.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/5 bg-ink-900 p-7">
              <h2 className="font-display text-xl font-semibold text-cream-50">What’s included</h2>
              <ul className="mt-5 space-y-3">
                {service.features?.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-cream-100/85">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button to="/contact" className="mt-7 w-full">
                <Phone size={15} /> Book a Site Visit
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
