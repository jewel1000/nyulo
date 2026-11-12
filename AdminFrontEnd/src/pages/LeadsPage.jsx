import { Fragment, useCallback, useEffect, useState } from 'react';
import { ChevronDown, Mail, Phone, Trash2 } from 'lucide-react';
import { admin } from '../api/client.js';
import { Alert, Button, Card, PageHeader, Spinner, formatDate } from '../components/ui.jsx';

const STATUSES = [
  { value: 'new', label: 'New', className: 'bg-brand-100 text-brand-700' },
  { value: 'contacted', label: 'Contacted', className: 'bg-sky-100 text-sky-800' },
  { value: 'closed', label: 'Closed', className: 'bg-neutral-100 text-neutral-600' },
];

const formatBDT = (amount) => `৳${Number(amount || 0).toLocaleString('en-BD')}`;

/** What differs between the two kinds of lead. */
const KINDS = {
  contacts: {
    title: 'Contact messages',
    description: 'Messages sent from the Contact page.',
    summaryLabel: 'Interested in',
    summary: (lead) => lead.serviceInterest || '—',
    details: (lead) => [
      ['Subject', lead.subject],
      ['Message', lead.message],
    ],
  },
  estimates: {
    title: 'Budget requests',
    description: 'Callback requests left after using the Budget Planner.',
    summaryLabel: 'Estimate',
    summary: (lead) => `${formatBDT(lead.estimatedMin)} – ${formatBDT(lead.estimatedMax)}`,
    details: (lead) => [
      ['Space', lead.spaceType],
      ['Package', lead.packageKey],
      ['Area', `${Number(lead.areaSqft || 0).toLocaleString()} sqft`],
    ],
  },
};

export default function LeadsPage({ kind }) {
  const config = KINDS[kind];
  const [leads, setLeads] = useState(null);
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    try {
      const response = await admin.get(`/resources/${kind}`);
      setLeads(response.data);
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
      setLeads([]);
    }
  }, [kind]);

  useEffect(() => {
    setLeads(null);
    setOpenId(null);
    setFilter('all');
    setNotice(null);
    load();
  }, [load]);

  const patch = async (lead, changes) => {
    try {
      const response = await admin.patch(`/resources/${kind}/${lead._id}`, changes);
      setLeads((current) => current.map((item) => (item._id === lead._id ? response.data : item)));
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
    }
  };

  const remove = async (lead) => {
    if (!window.confirm(`Delete the lead from ${lead.name}? This cannot be undone.`)) return;
    try {
      await admin.delete(`/resources/${kind}/${lead._id}`);
      setLeads((current) => current.filter((item) => item._id !== lead._id));
    } catch (error) {
      setNotice({ type: 'error', message: error.message });
    }
  };

  const statusOf = (lead) => lead.status || 'new';
  const visible = (leads || []).filter((lead) => filter === 'all' || statusOf(lead) === filter);

  return (
    <>
      <PageHeader title={config.title} description={config.description} />

      {notice && (
        <div className="mb-4">
          <Alert type={notice.type} message={notice.message} onClose={() => setNotice(null)} />
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {[{ value: 'all', label: 'All' }, ...STATUSES].map((option) => {
          const count = option.value === 'all' ? leads?.length : leads?.filter((lead) => statusOf(lead) === option.value).length;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === option.value ? 'border-brand-500 bg-brand-500 text-white' : 'border-black/15 bg-white text-neutral-600 hover:border-brand-400'
              }`}
            >
              {option.label} {leads && <span className="opacity-70">({count})</span>}
            </button>
          );
        })}
      </div>

      <Card>
        {leads === null ? (
          <Spinner />
        ) : visible.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-neutral-400">No leads here yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[11px] uppercase tracking-wider text-neutral-500">
                  <th className="px-4 py-2.5 font-bold">Name</th>
                  <th className="px-4 py-2.5 font-bold">Contact</th>
                  <th className="px-4 py-2.5 font-bold">{config.summaryLabel}</th>
                  <th className="px-4 py-2.5 font-bold">Received</th>
                  <th className="px-4 py-2.5 font-bold">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {visible.map((lead) => {
                  const status = STATUSES.find((item) => item.value === statusOf(lead)) || STATUSES[0];
                  const isOpen = openId === lead._id;
                  return (
                    <Fragment key={lead._id}>
                      <tr className="hover:bg-neutral-50">
                        <td className="px-4 py-3 font-semibold">{lead.name}</td>
                        <td className="px-4 py-3">
                          <a href={`tel:${String(lead.phone).replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-brand-600">
                            <Phone size={12} /> {lead.phone}
                          </a>
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-brand-600">
                              <Mail size={12} /> {lead.email}
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-3">{config.summary(lead)}</td>
                        <td className="px-4 py-3 text-neutral-500">{formatDate(lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          <select
                            aria-label={`Status of the lead from ${lead.name}`}
                            value={status.value}
                            onChange={(e) => patch(lead, { status: e.target.value })}
                            className={`cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-bold outline-none ${status.className}`}
                          >
                            {STATUSES.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-label="Show details"
                              title="Details"
                              onClick={() => setOpenId(isOpen ? null : lead._id)}
                              className="rounded-lg p-2 text-neutral-600 hover:bg-black/5"
                            >
                              <ChevronDown size={16} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <button type="button" aria-label="Delete" title="Delete" onClick={() => remove(lead)} className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-700">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-neutral-50">
                          <td colSpan={6} className="px-4 py-4">
                            <LeadDetails lead={lead} rows={config.details(lead)} onSaveNotes={(notes) => patch(lead, { notes })} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

function LeadDetails({ lead, rows, onSaveNotes }) {
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await onSaveNotes(notes);
    setSaving(false);
  };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <dl className="space-y-2 text-sm">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{label}</dt>
              <dd className="whitespace-pre-wrap text-neutral-800">{value}</dd>
            </div>
          ))}
      </dl>
      <div>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-neutral-500">Your notes (private)</span>
          <textarea className="control resize-y" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <Button size="sm" variant="secondary" loading={saving} onClick={save} className="mt-2" disabled={notes === (lead.notes || '')}>
          Save notes
        </Button>
      </div>
    </div>
  );
}
