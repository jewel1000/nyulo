import { ArrowRight } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { fetchProjects } from '../../api/projects.api.js';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx';
import ErrorState from '../common/ErrorState.jsx';
import ProjectCard from '../projects/ProjectCard.jsx';

export default function PortfolioPreview() {
  const { data: projects, loading, error, refetch } = useFetch(
    () => fetchProjects({ featured: true, limit: 4 }),
    []
  );

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Recent Work"
          title="A Few Spaces We’re Proud Of"
          subtitle="Kitchens, penthouses, offices and cafés — designed in our studio and built by our own team."
        />
        {loading && <Spinner />}
        {error && <ErrorState error={error} onRetry={refetch} />}
        {projects && (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Button to="/work" variant="outline">
            Browse All Work <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
