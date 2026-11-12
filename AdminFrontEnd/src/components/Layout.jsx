import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PanelsTopLeft,
  Sparkles,
  Star,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';

const NAV = [
  { heading: null, items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  {
    heading: 'Content',
    items: [
      { to: '/projects', label: 'Projects', icon: FolderKanban },
      { to: '/services', label: 'Services', icon: Sparkles },
      { to: '/testimonials', label: 'Reviews', icon: Star },
      { to: '/blogs', label: 'Journal', icon: BookOpen },
      { to: '/site', label: 'Site content', icon: PanelsTopLeft },
    ],
  },
  {
    heading: 'Leads',
    items: [
      { to: '/leads/contacts', label: 'Contact messages', icon: MessageSquareText },
      { to: '/leads/estimates', label: 'Budget requests', icon: Calculator },
    ],
  },
  { heading: 'Account', items: [{ to: '/account', label: 'Password', icon: UserRound }] },
];

export default function Layout() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-neutral-600 hover:bg-black/5'
    }`;

  const sidebar = (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <div className="px-2 pt-1">
        <p className="font-display text-xl font-semibold">Nyulo</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">Admin</p>
      </div>
      {NAV.map((group) => (
        <div key={group.heading || 'main'}>
          {group.heading && (
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{group.heading}</p>
          )}
          <div className="space-y-0.5">
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
                <Icon size={17} /> {label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-auto space-y-1 border-t border-black/10 pt-4">
        <a
          href={import.meta.env.VITE_SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-black/5"
        >
          <ExternalLink size={17} /> View website
        </a>
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-black/5"
        >
          <LogOut size={17} /> Sign out
          <span className="ml-auto truncate text-xs text-neutral-400">{user?.username}</span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/10 bg-white lg:block">{sidebar}</aside>

      {/* Mobile top bar + drawer */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        <p className="font-display text-lg font-semibold">
          Nyulo <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Admin</span>
        </p>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-black/5">
          <Menu size={20} />
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-72 bg-white shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 hover:bg-black/5"
            >
              <X size={18} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
