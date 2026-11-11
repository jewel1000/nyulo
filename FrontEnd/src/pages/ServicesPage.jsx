import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchServices } from '../api/services.api.js';

export default function ServicesPage() {
  const { data: services, loading, error, refetch } = useFetch(fetchServices, []);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything Your Space Needs"
        subtitle="Five integrated services — design, visualization, construction and landscape — delivered by one accountable team."
      />
      <section className="py-24">
        <Container>
          {loading && <Spinner />}
          {error && <ErrorState error={error} onRetry={refetch} />}
          {services && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.slug} delay={index * 70}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
