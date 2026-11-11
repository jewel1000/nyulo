import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import Reveal from '../components/common/Reveal.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import CoreValues from '../components/home/CoreValues.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import { COMPANY, TEAM } from '../constants/index.js';

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nyulo"
        title="A Small Studio That Builds What It Draws"
        subtitle={`Designing homes and workplaces across Bangladesh since ${COMPANY.founded}.`}
      />

      {/* Story */}
      <section className="py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Interior designed by the studio"
                className="rounded-2xl object-cover"
              />
              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-500 px-6 py-5 text-ink-950 sm:block">
                <p className="font-display text-3xl font-semibold">9+</p>
                <p className="text-xs font-semibold uppercase tracking-wider">Years of Craft</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Designed Around You, Built on Trust"
            />
            <Reveal className="mt-6 space-y-4 text-sm leading-relaxed text-ink-300 sm:text-base">
              <p>
                {COMPANY.name} began in {COMPANY.founded} with a simple conviction: great interiors
                are not about decoration — they are about how a space makes you live, work and feel
                every single day. More than 150 projects later, that conviction still drives every
                drawing we produce.
              </p>
              <p>
                We are a full-service studio: architects, interior designers, 3D artists and an
                in-house execution team under one roof. That integration is why our renders match
                our handovers — the people who design your space are the same people accountable
                for building it.
              </p>
              <p>
                From compact Aftabnagar apartments to multi-floor corporate headquarters in Motijheel,
                we bring the same discipline to every brief: listen first, design around life,
                document everything, and deliver exactly what was approved.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <StatsBar />

      {/* Team */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Team"
            title="The People Behind the Projects"
            subtitle="A multidisciplinary leadership team supported by 25+ designers, engineers and craftspeople."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, index) => (
              <Reveal key={member.name} delay={index * 80}>
                <div className="group overflow-hidden rounded-2xl border border-white/5 bg-ink-900">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-cream-50">{member.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-brand-400">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CoreValues />
      <CtaBanner />
    </>
  );
}
