import Button from '../components/common/Button.jsx';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-8xl font-semibold text-brand-500/40">404</p>
      <h1 className="font-display text-3xl font-semibold text-cream-50">This page doesn’t exist</h1>
      <p className="max-w-md text-sm text-ink-300">
        The page you’re looking for may have been moved or removed. Let’s get you back to somewhere beautiful.
      </p>
      <Button to="/">Back to Home</Button>
    </section>
  );
}
