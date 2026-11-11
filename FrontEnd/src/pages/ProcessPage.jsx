import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import { PROCESS_STEPS } from '../constants/index.js';

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How We Work"
        title="From First Call to Moving In"
        subtitle="Every project follows the same transparent path — so you always know what happens next, how long it takes and what it costs."
      />
      <section className="py-24">
        <Container className="max-w-4xl">
          <ol className="relative space-y-12 border-l border-white/10 pl-10">
            {PROCESS_STEPS.map((phase, index) => (
              <Reveal key={phase.step} delay={index * 60}>
                <li className="relative">
                  <span className="absolute -left-[55px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-ink-950">
                    {index + 1}
                  </span>
                  <div className="rounded-2xl border border-white/5 bg-ink-900 p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="font-display text-2xl font-semibold text-cream-50">{phase.title}</h2>
                      <span className="rounded-full border border-brand-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:text-base">{phase.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
