import { useState } from 'react';
import { CheckCircle2, PhoneCall } from 'lucide-react';
import { TextInput } from '../common/FormField.jsx';
import { saveEstimateLead } from '../../api/estimates.api.js';
import { formatBDT } from '../../utils/format.js';

const BREAKDOWN_LABELS = {
  materials: 'Materials & Finishes',
  labor: 'Labor & Installation',
  designAndDrawings: 'Design & Drawings',
  projectManagement: 'Project Management',
};

export default function EstimateResult({ quote, formInput }) {
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (event) => setLead((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSave = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const response = await saveEstimateLead({
        ...lead,
        spaceType: formInput.spaceType,
        packageKey: formInput.packageKey,
        areaSqft: Number(formInput.areaSqft),
      });
      setStatus({ state: 'success', message: response.message });
    } catch (err) {
      setStatus({ state: 'error', message: [err.message, ...(err.errors || [])].join(' — ') });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quote */}
      <div className="rounded-2xl border border-brand-500/30 bg-ink-900 p-7 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Estimated Budget</p>
        <p className="mt-3 font-display text-3xl font-semibold text-cream-50 sm:text-4xl">
          ৳{formatBDT(quote.range.min)} – ৳{formatBDT(quote.range.max)}
        </p>
        <p className="mt-2 text-sm text-ink-300">
          {quote.spaceType.label} · {quote.package.label} package · {quote.areaSqft.toLocaleString()} sqft
          at ~৳{formatBDT(quote.effectiveRatePerSqft)}/sqft
        </p>

        <div className="mt-7 space-y-3 border-t border-black/15 pt-6">
          {Object.entries(quote.breakdown).map(([key, amount]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-ink-300">{BREAKDOWN_LABELS[key] || key}</span>
              <span className="font-semibold text-cream-50">৳{formatBDT(amount)}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-ink-400">
          This is an indicative range based on typical material and finish selections. Your final
          quotation follows a free consultation and site measurement.
        </p>
      </div>

      {/* Lead capture */}
      {status.state === 'success' ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-500/30 bg-ink-900 p-8 text-center">
          <CheckCircle2 size={36} className="text-brand-400" />
          <p className="max-w-sm text-sm text-ink-300">{status.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-black/10 bg-ink-900 p-7">
          <h3 className="font-display text-xl font-semibold text-cream-50">
            Want this estimate reviewed by a designer?
          </h3>
          <p className="text-sm text-ink-300">Leave your details and we’ll call you back within one business day.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Name" required placeholder="Full name" value={lead.name} onChange={update('name')} />
            <TextInput label="Phone" required placeholder="+880 1XXX-XXXXXX" value={lead.phone} onChange={update('phone')} />
          </div>
          <TextInput label="Email (optional)" type="email" placeholder="you@example.com" value={lead.email} onChange={update('email')} />
          {status.state === 'error' && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
              {status.message}
            </p>
          )}
          <button
            type="submit"
            disabled={status.state === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 px-7 py-3 text-sm font-semibold text-brand-400 transition hover:bg-brand-500 hover:text-ink-950 disabled:opacity-60"
          >
            <PhoneCall size={15} />
            {status.state === 'loading' ? 'Saving…' : 'Request a Callback'}
          </button>
        </form>
      )}
    </div>
  );
}
