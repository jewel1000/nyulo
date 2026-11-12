import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { TextInput, TextArea, Select } from '../common/FormField.jsx';
import { submitContact } from '../../api/contact.api.js';
import useFetch from '../../hooks/useFetch.js';
import { fetchServices } from '../../api/services.api.js';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  serviceInterest: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  // Options follow the services list, so they stay right when services are edited.
  const { data: services } = useFetch(fetchServices, []);
  const SERVICE_OPTIONS = [...(services || []).map((service) => service.title), 'Other'];
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const response = await submitContact(form);
      setStatus({ state: 'success', message: response.message });
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus({
        state: 'error',
        message: [error.message, ...(error.errors || [])].join(' — '),
      });
    }
  };

  if (status.state === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-500/30 bg-ink-900 p-10 text-center">
        <CheckCircle2 size={40} className="text-brand-400" />
        <h3 className="font-display text-2xl font-semibold text-cream-50">Message received!</h3>
        <p className="max-w-sm text-sm text-ink-300">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle', message: '' })}
          className="text-sm font-semibold text-brand-400 hover:text-brand-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-black/10 bg-ink-900 p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Your Name" required placeholder="Full name" value={form.name} onChange={update('name')} />
        <TextInput label="Phone" required placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={update('phone')} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Email" required type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} />
        <Select label="What do you need?" value={form.serviceInterest} onChange={update('serviceInterest')}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </div>
      <TextInput label="Subject" placeholder="e.g. 1,800 sqft apartment in Banani" value={form.subject} onChange={update('subject')} />
      <TextArea
        label="Message"
        required
        placeholder="Tell us about your space, timeline and budget…"
        value={form.message}
        onChange={update('message')}
      />
      {status.state === 'error' && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={status.state === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={15} />
        {status.state === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
