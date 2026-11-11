const baseClasses =
  'w-full rounded-xl border border-black/15 bg-ink-950 px-4 py-3 text-sm text-cream-50 placeholder:text-ink-400 outline-none transition focus:border-brand-500';

export function TextInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-300">
        {label}
        {props.required && <span className="text-brand-400"> *</span>}
      </span>
      <input className={baseClasses} {...props} />
    </label>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-300">
        {label}
        {props.required && <span className="text-brand-400"> *</span>}
      </span>
      <textarea className={`${baseClasses} min-h-32 resize-y`} {...props} />
    </label>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-300">
        {label}
        {props.required && <span className="text-brand-400"> *</span>}
      </span>
      <select className={`${baseClasses} appearance-none`} {...props}>
        {children}
      </select>
    </label>
  );
}
