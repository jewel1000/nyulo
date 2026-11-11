import useCountUp from '../../hooks/useCountUp.js';
import { STATS } from '../../constants/index.js';

function StatItem({ stat }) {
  const [ref, value] = useCountUp(stat.value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 py-8 text-center">
      <span className="font-display text-4xl font-semibold text-brand-400 sm:text-5xl">
        {value.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-ink-300">{stat.label}</span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-black/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
