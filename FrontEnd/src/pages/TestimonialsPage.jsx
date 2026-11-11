import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import TestimonialCard from '../components/testimonials/TestimonialCard.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchTestimonials } from '../api/testimonials.api.js';

export default function TestimonialsPage() {
  const { data: testimonials, loading, error, refetch } = useFetch(
    () => fetchTestimonials({ limit: 50 }),
    []
  );

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What Clients Tell Us"
        subtitle="Homeowners, restaurateurs and corporate teams on working with our studio."
      />
      <section className="py-20">
        <Container>
          {loading && <Spinner />}
          {error && <ErrorState error={error} onRetry={refetch} />}
          {testimonials && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial._id} delay={(index % 3) * 70}>
                  <TestimonialCard testimonial={testimonial} />
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
