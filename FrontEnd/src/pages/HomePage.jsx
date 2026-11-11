import Hero from '../components/home/Hero.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import PortfolioPreview from '../components/home/PortfolioPreview.jsx';
import ServicesPreview from '../components/home/ServicesPreview.jsx';
import ProcessPreview from '../components/home/ProcessPreview.jsx';
import CoreValues from '../components/home/CoreValues.jsx';
import ClientsMarquee from '../components/home/ClientsMarquee.jsx';
import TestimonialsPreview from '../components/home/TestimonialsPreview.jsx';
import BlogPreview from '../components/home/BlogPreview.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PortfolioPreview />
      <ServicesPreview />
      <ProcessPreview />
      <CoreValues />
      <ClientsMarquee />
      <TestimonialsPreview />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
