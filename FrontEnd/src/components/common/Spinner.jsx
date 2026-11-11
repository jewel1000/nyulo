export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-300">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink-600 border-t-brand-400" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
