import useCountUp from '../../hooks/useCountUp.js';
import { useSite } from '../../context/SiteContext.jsx';

function StatItem({ stat }) {
  const [ref, value] = useCountUp(Number(stat.value) || 0);
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
  const { stats: STATS } = useSite();
  return (
    <section className="border-y border-black/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, index) => (
          <StatItem key={`${stat.label}-${index}`} stat={stat} />
        ))}
      </div>
    </section>
  );
}
