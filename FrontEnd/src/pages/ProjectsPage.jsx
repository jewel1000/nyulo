import { useState } from 'react';
import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchProjects } from '../api/projects.api.js';
import { PROJECT_CATEGORIES } from '../constants/index.js';

export default function ProjectsPage() {
  const [category, setCategory] = useState('All');
  const { data: projects, loading, error, refetch } = useFetch(
    () => fetchProjects(category === 'All' ? { limit: 24 } : { category, limit: 24 }),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects That Speak for Themselves"
        subtitle="Residential, commercial, office and hospitality interiors delivered turnkey across Dhaka."
      />
      <section className="py-20">
        <Container>
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {PROJECT_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  category === item
                    ? 'border-brand-500 bg-brand-500 text-ink-950'
                    : 'border-white/10 text-ink-300 hover:border-brand-500/50 hover:text-cream-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading && <Spinner />}
          {error && <ErrorState error={error} onRetry={refetch} />}
          {projects && projects.length === 0 && (
            <p className="py-24 text-center text-sm text-ink-300">No projects in this category yet.</p>
          )}
          {projects && projects.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 3) * 70}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
