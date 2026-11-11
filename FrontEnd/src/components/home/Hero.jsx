import { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../common/Button.jsx';
import { COMPANY } from '../../constants/index.js';

const SLIDES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((index) => (index + 1) % SLIDES.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background slides */}
      {SLIDES.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`hero-slide absolute inset-0 h-full w-full object-cover ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-400">
          Interior Design Studio · Dhaka
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.08] text-cream-50 sm:text-6xl lg:text-7xl">
          Spaces That Feel<br />
          Like <em className="italic text-brand-300">Home</em>,
          <span className="text-brand-400"> by Nyulo</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
          Thoughtful interiors for homes, offices and commercial spaces — planned around you,
          previewed in 3D and built end-to-end by one team since {COMPANY.founded}.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button to="/projects">
            View Projects <ArrowRight size={16} />
          </Button>
          <Button to="/contact" variant="outline">
            <Phone size={15} /> Free Consultation
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="mt-16 flex gap-2.5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === active ? 'w-10 bg-brand-400' : 'w-5 bg-cream-50/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
