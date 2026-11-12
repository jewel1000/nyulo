import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, FolderKanban, MessageSquareText, Sparkles, Star } from 'lucide-react';
import { admin } from '../api/client.js';
import { Alert, Card, PageHeader, Spinner, formatDate } from '../components/ui.jsx';

const TILES = [
  { key: 'projects', label: 'Projects', to: '/projects', icon: FolderKanban },
  { key: 'services', label: 'Services', to: '/services', icon: Sparkles },
  { key: 'testimonials', label: 'Reviews', to: '/testimonials', icon: Star },
  { key: 'blogs', label: 'Journal articles', to: '/blogs', icon: BookOpen },
  { key: 'contacts', label: 'Contact messages', to: '/leads/contacts', icon: MessageSquareText },
  { key: 'estimates', label: 'Budget requests', to: '/leads/estimates', icon: Calculator },
];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    admin.get('/dashboard').then((response) => setData(response.data)).catch(setError);
  }, []);

  if (error) return <Alert message={error.message} />;
  if (!data) return <Spinner />;

  const newLeads = data.newLeads.contacts + data.newLeads.estimates;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={
          newLeads > 0
            ? `${newLeads} new lead${newLeads > 1 ? 's' : ''} waiting for a reply.`
            : 'Everything on the website can be edited from the menu.'
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map(({ key, label, to, icon: Icon }) => (
          <Link key={key} to={to}>
            <Card className="flex items-center gap-4 p-5 transition hover:border-brand-400">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none">{data.counts[key]}</p>
                <p className="mt-1 text-xs font-medium text-neutral-500">{label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentLeads
          title="Latest contact messages"
          to="/leads/contacts"
          rows={data.recent.contacts}
          detail={(lead) => lead.serviceInterest || lead.subject || lead.email}
        />
        <RecentLeads
          title="Latest budget requests"
          to="/leads/estimates"
          rows={data.recent.estimates}
          detail={(lead) => `${lead.areaSqft?.toLocaleString()} sqft · ${lead.packageKey}`}
        />
      </div>
    </>
  );
}

function RecentLeads({ title, to, rows, detail }) {
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
        <h2 className="text-sm font-bold">{title}</h2>
        <Link to={to} className="text-xs font-semibold text-brand-600 hover:underline">
          View all
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-neutral-400">Nothing yet.</p>
      ) : (
        <ul className="divide-y divide-black/5">
          {rows.map((lead) => (
            <li key={lead._id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {lead.name}
                  {(lead.status || 'new') === 'new' && (
                    <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">NEW</span>
                  )}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {lead.phone} · {detail(lead)}
                </p>
              </div>
              <span className="shrink-0 text-xs text-neutral-400">{formatDate(lead.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
