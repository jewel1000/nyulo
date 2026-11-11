import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <Reveal className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-400">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-base leading-relaxed text-ink-300">{subtitle}</p>}
    </Reveal>
  );
}
