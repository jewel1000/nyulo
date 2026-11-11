import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import { CLIENT_NAMES } from '../../constants/index.js';

export default function ClientsMarquee() {
  const row = [...CLIENT_NAMES, ...CLIENT_NAMES]; // doubled for a seamless loop

  return (
    <section className="overflow-hidden py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Top Clients"
          title="Trusted by Teams Across Bangladesh"
        />
      </Container>
      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="marquee-track flex w-max gap-5">
          {row.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="whitespace-nowrap rounded-full border border-white/10 bg-ink-900 px-7 py-3.5 font-display text-lg text-ink-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
