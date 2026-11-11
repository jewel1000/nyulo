import useFetch from '../../hooks/useFetch.js';
import { fetchServices } from '../../api/services.api.js';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Spinner from '../common/Spinner.jsx';
import ErrorState from '../common/ErrorState.jsx';
import ServiceCard from '../services/ServiceCard.jsx';

export default function ServicesPreview() {
  const { data: services, loading, error, refetch } = useFetch(fetchServices, []);

  return (
    <section className="bg-ink-900/40 py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Six Ways We Can Help"
          subtitle="From a single wardrobe to a full office floor — designed, made and installed by one team."
        />
        {loading && <Spinner />}
        {error && <ErrorState error={error} onRetry={refetch} />}
        {services && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
