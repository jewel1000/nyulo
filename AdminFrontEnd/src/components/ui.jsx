import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';

const BUTTON_VARIANTS = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  secondary: 'border border-black/15 bg-white text-neutral-800 hover:bg-neutral-50',
  danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  ghost: 'text-neutral-600 hover:bg-black/5',
};

export function Button({ variant = 'primary', size = 'md', loading = false, className = '', children, ...rest }) {
  const sizing = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  return (
    <button
      type="button"
      disabled={loading || rest.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${sizing} ${BUTTON_VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-neutral-500">
      <Loader2 size={18} className="animate-spin text-brand-500" /> {label}
    </div>
  );
}

/** Success or error banner. Field-level problems from the API are listed underneath. */
export function Alert({ type = 'error', message, errors = [], onClose }) {
  if (!message) return null;
  const isError = type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
        isError ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      <Icon size={17} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold">{message}</p>
        {errors.length > 0 && (
          <ul className="mt-1 list-disc pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose} className="opacity-60 hover:opacity-100">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-neutral-900">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-neutral-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className = '', children }) {
  return <div className={`rounded-xl border border-black/10 bg-white ${className}`}>{children}</div>;
}

/** Slide-over panel used for create/edit forms. Esc and the backdrop close it. */
export function Drawer({ title, onClose, footer, children }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={title} className="relative flex h-full w-full max-w-2xl flex-col bg-[#f6f5f1] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-neutral-500 hover:bg-black/5">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-black/10 bg-white px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
