import { ArrowRight } from 'lucide-react';
import useFetch from '../../hooks/useFetch.js';
import { fetchBlogs } from '../../api/blogs.api.js';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx';
import BlogCard from '../blog/BlogCard.jsx';

export default function BlogPreview() {
  const { data: blogs, loading } = useFetch(() => fetchBlogs({ limit: 4 }), []);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Journal"
          title="Ideas & Advice for Your Next Project"
        />
        {loading && <Spinner />}
        {blogs && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blogs.map((blog, index) => (
              <Reveal key={blog.slug} delay={index * 80}>
                <BlogCard blog={blog} />
              </Reveal>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Button to="/journal" variant="outline">
            Read the Journal <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
