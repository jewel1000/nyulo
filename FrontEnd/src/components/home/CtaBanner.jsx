import { Calculator, Phone } from 'lucide-react';
import Container from '../common/Container.jsx';
import Reveal from '../common/Reveal.jsx';
import Button from '../common/Button.jsx';

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-950/85" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
            Let’s Design <span className="text-brand-400">Your Space</span>
          </h2>
          <p className="max-w-xl text-base text-cream-100/80">
            Book a free consultation with our design team, or get an instant budget range with the
            cost calculator — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact">
              <Phone size={15} /> Book a Free Consultation
            </Button>
            <Button to="/cost-estimator" variant="outline">
              <Calculator size={15} /> Try the Cost Calculator
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
