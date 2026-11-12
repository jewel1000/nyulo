import { useState } from 'react';
import { admin } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import { Alert, Button, Card, PageHeader } from '../components/ui.jsx';

const EMPTY = { currentPassword: '', newPassword: '', confirm: '' };

export default function AccountPage() {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setNotice(null);
    if (form.newPassword !== form.confirm) {
      setNotice({ type: 'error', message: 'The two new passwords do not match' });
      return;
    }
    setBusy(true);
    try {
      await admin.post('/auth/password', { currentPassword: form.currentPassword, newPassword: form.newPassword });
      setForm(EMPTY);
      setNotice({ type: 'success', message: 'Password changed. Use the new one next time you sign in.' });
    } catch (error) {
      setNotice({ type: 'error', message: error.message, errors: error.errors });
    } finally {
      setBusy(false);
    }
  };

  const field = (name, label, autoComplete, help) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-600">{label}</span>
      <input className="control" type="password" autoComplete={autoComplete} required value={form[name]} onChange={update(name)} />
      {help && <span className="mt-1.5 block text-xs text-neutral-500">{help}</span>}
    </label>
  );

  return (
    <>
      <PageHeader title="Password" description={`Signed in as ${user?.username}.`} />
      <Card className="max-w-md p-6">
        <form onSubmit={submit} className="space-y-4">
          {field('currentPassword', 'Current password', 'current-password')}
          {field('newPassword', 'New password', 'new-password', 'At least 10 characters.')}
          {field('confirm', 'Repeat new password', 'new-password')}
          {notice && <Alert type={notice.type} message={notice.message} errors={notice.errors} />}
          <Button type="submit" loading={busy}>Change password</Button>
        </form>
      </Card>
    </>
  );
}
