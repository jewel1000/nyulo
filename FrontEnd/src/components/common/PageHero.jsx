import Container from './Container.jsx';
import Reveal from './Reveal.jsx';

/** Shared banner for inner pages. */
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink-900 pb-16 pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,75,0.25), transparent)',
        }}
      />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-400">{eyebrow}</span>
          )}
          <h1 className="font-display text-4xl font-semibold text-cream-50 sm:text-5xl">{title}</h1>
          {subtitle && <p className="max-w-2xl text-base leading-relaxed text-ink-300">{subtitle}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
