import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import { Alert, Spinner } from './components/ui.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';
import LeadsPage from './pages/LeadsPage.jsx';
import SiteContentPage from './pages/SiteContentPage.jsx';
import AccountPage from './pages/AccountPage.jsx';

export default function App() {
  const { user, loading, bootError } = useAuth();

  if (loading) return <Spinner label="Starting…" />;
  if (bootError) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <Alert message="Cannot reach the admin server" errors={[bootError.message, 'Check your connection and reload the page.']} />
      </div>
    );
  }
  if (!user) return <LoginPage />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ResourcePage name="projects" />} />
        <Route path="/services" element={<ResourcePage name="services" />} />
        <Route path="/testimonials" element={<ResourcePage name="testimonials" />} />
        <Route path="/blogs" element={<ResourcePage name="blogs" />} />
        <Route path="/site" element={<SiteContentPage />} />
        <Route path="/leads/contacts" element={<LeadsPage kind="contacts" />} />
        <Route path="/leads/estimates" element={<LeadsPage kind="estimates" />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
