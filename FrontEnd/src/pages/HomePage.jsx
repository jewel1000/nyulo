import Hero from '../components/home/Hero.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import PortfolioPreview from '../components/home/PortfolioPreview.jsx';
import ServicesPreview from '../components/home/ServicesPreview.jsx';
import ProcessPreview from '../components/home/ProcessPreview.jsx';
import CoreValues from '../components/home/CoreValues.jsx';
import TestimonialsPreview from '../components/home/TestimonialsPreview.jsx';
import BlogPreview from '../components/home/BlogPreview.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <StatsBar />
      <PortfolioPreview />
      <TestimonialsPreview />
      <ProcessPreview />
      <CoreValues />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
