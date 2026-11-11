import { ArrowRight } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { fetchTestimonials } from '../../api/testimonials.api.js';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx';
import TestimonialCard from '../testimonials/TestimonialCard.jsx';

export default function TestimonialsPreview() {
  const { data: testimonials, loading } = useFetch(
    () => fetchTestimonials({ featured: true, limit: 3 }),
    []
  );

  return (
    <section className="bg-ink-900/40 py-24">
      <Container>
        <SectionHeading
          eyebrow="Client Testimonials"
          title="What Our Clients Say"
        />
        {loading && <Spinner />}
        {testimonials && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial._id} delay={index * 80}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Button to="/testimonials" variant="outline">
            All Testimonials <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
