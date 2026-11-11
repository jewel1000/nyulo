import { ArrowRight } from 'lucide-react';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Button from '../common/Button.jsx';
import { PROCESS_STEPS } from '../../constants/index.js';

export default function ProcessPreview() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Six Steps, One Point of Contact"
          subtitle="You always know what happens next, how long it takes and who to call."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((phase, index) => (
            <Reveal key={phase.step} delay={index * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-ink-900 p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-semibold text-brand-500/30">{phase.step}</span>
                  <span className="rounded-full border border-brand-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-cream-50">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{phase.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-4">
          <Button to="/how-we-work" variant="outline">
            See Each Step in Detail <ArrowRight size={16} />
          </Button>
          <Button to="/budget-planner">Plan Your Budget</Button>
        </div>
      </Container>
    </section>
  );
}
