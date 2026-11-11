import { TriangleAlert } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <TriangleAlert className="text-brand-400" size={32} />
      <p className="text-sm text-ink-300">
        {error?.message || 'Could not load content. Is the backend running on port 5000?'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-cream-50 transition hover:border-brand-400 hover:text-brand-400"
        >
          Try again
        </button>
      )}
    </div>
  );
}
