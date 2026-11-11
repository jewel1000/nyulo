import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import Button from '../common/Button.jsx';
import { COMPANY } from '../../constants/index.js';

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2200&q=85`;

const SLIDES = [
  { src: unsplash('photo-1600210492486-724fe5c67fb0'), label: 'Living Room' },
  { src: unsplash('photo-1484154218962-a197022b5858'), label: 'Modular Kitchen' },
  { src: unsplash('photo-1497366754035-f200968a6e72'), label: 'Workspace' },
  { src: unsplash('photo-1517248135467-4c7edcad34c4'), label: 'Restaurant' },
  { src: unsplash('photo-1600566753086-00f18fb6b3ea'), label: 'Apartment Lounge' },
];

const AUTOPLAY_MS = 5500;
const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step) => {
    setActive((index) => (index + step + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
    // `active` is a dependency so a manual change restarts the timer.
  }, [paused, active, go]);

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg transition hover:bg-brand-500 hover:text-white';

  return (
    <section
      className="relative flex h-screen min-h-[640px] flex-col justify-end overflow-hidden bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full-bleed photos, shown at full clarity */}
      {SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          loading={index === 0 ? 'eager' : 'lazy'}
          className={`hero-slide absolute inset-0 h-full w-full object-cover ${
            index === active ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
          }`}
        />
      ))}
      {/* Only the bottom edge is darkened, to keep the controls readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pb-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:pb-10">
        {/* Copy card */}
        <div className="max-w-xl rounded-3xl bg-ink-950/95 p-6 shadow-2xl backdrop-blur sm:p-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-400">
            Design &amp; Build Studio · Mirpur, Dhaka
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-cream-50 sm:text-5xl">
            Spaces That Feel Like <em className="italic text-brand-400">Home</em>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-300 sm:text-base">
            Thoughtful interiors for homes, offices and commercial spaces — planned around you,
            previewed in 3D and built end-to-end by one team since {COMPANY.founded}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/work">
              See Our Work <ArrowRight size={16} />
            </Button>
            <Button to="/contact" variant="outline">
              <Phone size={15} /> Book a Site Visit
            </Button>
          </div>
        </div>

        {/* Slide controls */}
        <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
          <div className="text-white lg:text-right">
            <p className="font-display text-2xl font-semibold drop-shadow">{SLIDES[active].label}</p>
            <p className="mt-1 text-xs font-semibold tracking-widest text-white/80">
              {pad(active + 1)} <span className="text-white/50">/ {pad(SLIDES.length)}</span>
            </p>
          </div>
          <div className="flex gap-2.5">
            <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={arrowClass}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(1)} className={arrowClass}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress segments */}
      <div className="relative flex gap-1.5 px-4 pb-4 sm:px-6 lg:px-8">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              index === active ? 'bg-white' : 'bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
