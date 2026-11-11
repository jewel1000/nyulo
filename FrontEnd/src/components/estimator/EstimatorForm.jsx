import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { TextInput, Select } from '../common/FormField.jsx';
import Spinner from '../common/Spinner.jsx';
import ErrorState from '../common/ErrorState.jsx';
import useFetch from '../../hooks/useFetch.js';
import { fetchEstimatorConfig, calculateEstimate } from '../../api/estimates.api.js';

export default function EstimatorForm({ onResult }) {
  const { data: config, loading, error: configError, refetch } = useFetch(fetchEstimatorConfig, []);
  const [form, setForm] = useState({ spaceType: 'apartment', packageKey: 'premium', areaSqft: '1500' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const response = await calculateEstimate({ ...form, areaSqft: Number(form.areaSqft) });
      setStatus({ state: 'idle', message: '' });
      onResult(response.data, form);
    } catch (err) {
      setStatus({ state: 'error', message: [err.message, ...(err.errors || [])].join(' — ') });
    }
  };

  if (loading) return <Spinner label="Loading estimator…" />;
  if (configError) return <ErrorState error={configError} onRetry={refetch} />;
  if (!config) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/5 bg-ink-900 p-7 sm:p-9">
      <Select label="Space Type" required value={form.spaceType} onChange={update('spaceType')}>
        {config.spaceTypes.map((space) => (
          <option key={space.key} value={space.key}>{space.label}</option>
        ))}
      </Select>

      <div>
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-300">
          Package <span className="text-brand-400">*</span>
        </span>
        <div className="grid gap-3 sm:grid-cols-3">
          {config.packages.map((pkg) => (
            <button
              key={pkg.key}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, packageKey: pkg.key }))}
              className={`rounded-xl border p-4 text-left transition ${
                form.packageKey === pkg.key
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-white/10 hover:border-brand-500/40'
              }`}
            >
              <p className="font-display text-lg font-semibold text-cream-50">{pkg.label}</p>
              <p className="mt-1 text-xs text-ink-300">
                from <span className="font-semibold text-brand-400">৳{pkg.ratePerSqft.toLocaleString()}</span>/sqft
              </p>
            </button>
          ))}
        </div>
      </div>

      <TextInput
        label={`Area (sqft, ${config.areaLimits.min}–${config.areaLimits.max.toLocaleString()})`}
        required
        type="number"
        min={config.areaLimits.min}
        max={config.areaLimits.max}
        value={form.areaSqft}
        onChange={update('areaSqft')}
      />

      {status.state === 'error' && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Calculator size={15} />
        {status.state === 'loading' ? 'Calculating…' : 'Calculate Estimate'}
      </button>
    </form>
  );
}
