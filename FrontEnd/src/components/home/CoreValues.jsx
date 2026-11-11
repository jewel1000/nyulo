import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import { CORE_VALUES } from '../../constants/index.js';
import { getIcon } from '../../utils/iconMap.js';

export default function CoreValues() {
  return (
    <section className="bg-ink-900/40 py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Nyulo"
          title="What You Can Count On"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((value, index) => {
            const Icon = getIcon(value.icon);
            return (
              <Reveal key={value.title} delay={index * 80}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-white/5 bg-ink-950 p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cream-50">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{value.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
