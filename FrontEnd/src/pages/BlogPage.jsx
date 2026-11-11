import PageHero from '../components/common/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchBlogs } from '../api/blogs.api.js';

export default function BlogPage() {
  const { data: blogs, loading, error, refetch } = useFetch(() => fetchBlogs({ limit: 24 }), []);

  return (
    <>
      <PageHero
        eyebrow="Latest Insights"
        title="The Design Journal"
        subtitle="Ideas, budgets and trends from our studio — practical guidance for your next project."
      />
      <section className="py-20">
        <Container>
          {loading && <Spinner />}
          {error && <ErrorState error={error} onRetry={refetch} />}
          {blogs && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <Reveal key={blog.slug} delay={(index % 3) * 70}>
                  <BlogCard blog={blog} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
