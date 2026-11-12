import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../auth/AuthContext.jsx';
import { Alert, Button } from '../components/ui.jsx';

/**
 * Sign-in screen. On a brand-new installation (no admin account yet) it
 * becomes the "create the first admin" screen instead.
 */
export default function LoginPage() {
  const { needsSetup, signIn, createFirstAdmin } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError(null);
    if (needsSetup && form.password !== form.confirm) {
      setError({ message: 'The two passwords do not match' });
      return;
    }
    setBusy(true);
    try {
      const credentials = { username: form.username, password: form.password };
      await (needsSetup ? createFirstAdmin(credentials) : signIn(credentials));
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
            <LockKeyhole size={20} />
          </span>
          <div>
            <p className="font-display text-xl font-semibold">Nyulo Admin</p>
            <p className="text-xs text-neutral-500">
              {needsSetup ? 'Create the first admin account' : 'Sign in to manage the website'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">Username</span>
            <input className="control" autoComplete="username" autoFocus required value={form.username} onChange={update('username')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">Password</span>
            <input
              className="control"
              type="password"
              autoComplete={needsSetup ? 'new-password' : 'current-password'}
              required
              value={form.password}
              onChange={update('password')}
            />
            {needsSetup && <span className="mt-1.5 block text-xs text-neutral-500">At least 10 characters.</span>}
          </label>
          {needsSetup && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">Repeat password</span>
              <input className="control" type="password" autoComplete="new-password" required value={form.confirm} onChange={update('confirm')} />
            </label>
          )}

          <Alert message={error?.message} errors={error?.errors} />

          <Button type="submit" loading={busy} className="w-full py-2.5!">
            {needsSetup ? 'Create account' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  );
}
