import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/5 bg-ink-900 p-6">
      <Quote size={24} className="text-brand-500/60" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-cream-100/90">“{testimonial.message}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className="h-11 w-11 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <p className="text-sm font-semibold text-cream-50">{testimonial.name}</p>
          <p className="text-xs text-ink-400">
            {[testimonial.projectType, testimonial.location].filter(Boolean).join(' · ')}
          </p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={13} className="fill-brand-400 text-brand-400" />
          ))}
        </div>
      </div>
    </article>
  );
}
