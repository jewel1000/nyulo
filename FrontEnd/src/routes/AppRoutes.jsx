import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ServicesPage from '../pages/ServicesPage.jsx';
import ServiceDetailPage from '../pages/ServiceDetailPage.jsx';
import ProjectsPage from '../pages/ProjectsPage.jsx';
import ProjectDetailPage from '../pages/ProjectDetailPage.jsx';
import ProcessPage from '../pages/ProcessPage.jsx';
import TestimonialsPage from '../pages/TestimonialsPage.jsx';
import BlogPage from '../pages/BlogPage.jsx';
import BlogDetailPage from '../pages/BlogDetailPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import CostEstimatorPage from '../pages/CostEstimatorPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/work" element={<ProjectsPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/how-we-work" element={<ProcessPage />} />
        <Route path="/reviews" element={<TestimonialsPage />} />
        <Route path="/journal" element={<BlogPage />} />
        <Route path="/journal/:slug" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/budget-planner" element={<CostEstimatorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
