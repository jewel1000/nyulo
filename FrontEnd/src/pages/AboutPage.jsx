import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import Reveal from '../components/common/Reveal.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import CoreValues from '../components/home/CoreValues.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import { useSite } from '../context/SiteContext.jsx';

export default function AboutPage() {
  const { about, team } = useSite();

  return (
    <>
      <PageHero eyebrow="About Nyulo" title={about.heroTitle} subtitle={about.heroSubtitle} />

      {/* Story */}
      <section className="py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              {about.image && (
                <img src={about.image} alt="Interior designed by the studio" className="rounded-2xl object-cover" />
              )}
              {about.badgeValue && (
                <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-500 px-6 py-5 text-ink-950 sm:block">
                  <p className="font-display text-3xl font-semibold">{about.badgeValue}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider">{about.badgeLabel}</p>
                </div>
              )}
            </div>
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title={about.storyTitle} />
            <Reveal className="mt-6 space-y-4 text-sm leading-relaxed text-ink-300 sm:text-base">
              {(about.paragraphs || []).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <StatsBar />

      {/* Team */}
      {team.length > 0 && (
        <section className="py-24">
          <Container>
            <SectionHeading eyebrow="Our Team" title={about.teamTitle} subtitle={about.teamSubtitle} />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <Reveal key={`${member.name}-${index}`} delay={(index % 4) * 80}>
                  <div className="group overflow-hidden rounded-2xl border border-black/10 bg-ink-900">
                    <div className="aspect-[4/5] overflow-hidden bg-ink-800">
                      {member.photo && (
                        <img
                          src={member.photo}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      )}
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
      )}

      <CoreValues />
      <CtaBanner />
    </>
  );
}
